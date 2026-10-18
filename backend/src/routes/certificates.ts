import { Router, Request, Response } from 'express';
import Certificate from '../models/Certificate.js';
import CertificateRequest from '../models/CertificateRequest.js';
import CertificationProgram from '../models/CertificationProgram.js';
import { protect } from '../middleware/auth.js';
import { generateCertificateId, generateVerificationHash } from '../utils/certificateGenerator.js';
import {
  sendCertificateRequestConfirmation,
  sendCertificateRequestNotification,
  sendCertificateIssued,
  sendCertificateRejected,
} from '../utils/mailer.js';

const router = Router();

// ═══════════════════════════════════════════════════════════
// PUBLIC ENDPOINTS
// ═══════════════════════════════════════════════════════════

/**
 * POST /api/v1/certificates/request
 * Submit a certificate request
 */
router.post('/request', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, courseName, batchId, completionDate, message } = req.body;

    if (!name || !email || !courseName || !batchId) {
      res.status(400).json({
        success: false,
        message: 'Name, email, course name, and batch ID are required',
      });
      return;
    }

    const request = await CertificateRequest.create({
      name,
      email,
      phone,
      courseName,
      batchId,
      completionDate: completionDate ? new Date(completionDate) : undefined,
      message,
    });

    // Send confirmation to student
    await sendCertificateRequestConfirmation({
      name,
      email,
      courseName,
      batchId,
      requestId: request._id.toString(),
    });

    // Notify admin
    await sendCertificateRequestNotification({
      name,
      email,
      phone,
      courseName,
      batchId,
      message,
      requestId: request._id.toString(),
    });

    res.status(201).json({
      success: true,
      message: 'Certificate request submitted successfully',
      requestId: request._id,
    });
  } catch (error) {
    console.error('Certificate request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/v1/certificates/verify/:certificateId
 * Verify a certificate by ID
 */
router.get('/verify/:certificateId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId: certificateId.toUpperCase() });

    if (!certificate) {
      res.json({
        success: true,
        valid: false,
        message: 'Certificate not found',
      });
      return;
    }

    if (certificate.status === 'revoked') {
      res.json({
        success: true,
        valid: false,
        message: 'This certificate has been revoked',
        certificate: {
          certificateId: certificate.certificateId,
          studentName: certificate.studentName,
          courseName: certificate.courseName,
          status: certificate.status,
        },
      });
      return;
    }

    res.json({
      success: true,
      valid: true,
      message: 'Valid certificate',
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        studentEmail: certificate.studentEmail,
        courseName: certificate.courseName,
        courseCode: certificate.courseCode,
        batchId: certificate.batchId,
        issueDate: certificate.issueDate,
        expiryDate: certificate.expiryDate,
        instructorName: certificate.instructorName,
        grade: certificate.grade,
        status: certificate.status,
        metadata: certificate.metadata,
      },
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/v1/certificates/programs
 * Get all published certification programs
 */
router.get('/programs', async (_req: Request, res: Response): Promise<void> => {
  try {
    const programs = await CertificationProgram.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: programs });
  } catch (error) {
    console.error('Programs fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/v1/certificates/recent
 * Get recent certificates (anonymized for showcase)
 */
router.get('/recent', async (_req: Request, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find({ status: 'issued' })
      .sort({ issueDate: -1 })
      .limit(12)
      .select('certificateId courseName courseCode issueDate metadata.duration');

    // Anonymize student names
    const anonymized = certificates.map((cert) => ({
      certificateId: cert.certificateId,
      courseName: cert.courseName,
      courseCode: cert.courseCode,
      issueDate: cert.issueDate,
      duration: cert.metadata.duration,
    }));

    res.json({ success: true, data: anonymized });
  } catch (error) {
    console.error('Recent certificates error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════
// ADMIN ENDPOINTS (Protected)
// ═══════════════════════════════════════════════════════════

/**
 * GET /api/v1/certificates/requests
 * Get all certificate requests (admin only)
 */
router.get('/requests', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const requests = await CertificateRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * PUT /api/v1/certificates/requests/:id/approve
 * Approve a certificate request and issue certificate
 */
router.put('/requests/:id/approve', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const request = await CertificateRequest.findById(req.params.id);
    if (!request) {
      res.status(404).json({ success: false, message: 'Request not found' });
      return;
    }

    const {
      courseCode,
      instructorName = 'Hackitise Labs',
      grade,
      duration,
      score,
    } = req.body;

    if (!courseCode || !duration) {
      res.status(400).json({ success: false, message: 'Course code and duration are required' });
      return;
    }

    // Generate certificate
    const certificateId = generateCertificateId();
    const issueDate = new Date();
    const verificationHash = generateVerificationHash({
      certificateId,
      studentEmail: request.email,
      issueDate,
    });

    const certificate = await Certificate.create({
      certificateId,
      studentName: request.name,
      studentEmail: request.email,
      courseName: request.courseName,
      courseCode,
      batchId: request.batchId,
      issueDate,
      instructorName,
      grade,
      verificationHash,
      status: 'issued',
      metadata: {
        duration,
        completionDate: request.completionDate || new Date(),
        score,
      },
    });

    // Update request
    request.status = 'approved';
    request.linkedCertificateId = certificate.certificateId;
    await request.save();

    // Send certificate email
    await sendCertificateIssued({
      name: request.name,
      email: request.email,
      certificateId: certificate.certificateId,
      courseName: request.courseName,
      issueDate,
      grade,
    });

    res.json({
      success: true,
      message: 'Certificate issued successfully',
      certificate: {
        certificateId: certificate.certificateId,
        verificationUrl: `/certification/verify/${certificate.certificateId}`,
      },
    });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * PUT /api/v1/certificates/requests/:id/reject
 * Reject a certificate request
 */
router.put('/requests/:id/reject', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { reason } = req.body;
    if (!reason) {
      res.status(400).json({ success: false, message: 'Rejection reason is required' });
      return;
    }

    const request = await CertificateRequest.findById(req.params.id);
    if (!request) {
      res.status(404).json({ success: false, message: 'Request not found' });
      return;
    }

    request.status = 'rejected';
    request.rejectionReason = reason;
    await request.save();

    // Send rejection email
    await sendCertificateRejected({
      name: request.name,
      email: request.email,
      courseName: request.courseName,
      reason,
    });

    res.json({ success: true, message: 'Request rejected', data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/v1/certificates (admin)
 * Get all issued certificates
 */
router.get('/', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * POST /api/v1/certificates (admin)
 * Manually issue a certificate
 */
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      studentName,
      studentEmail,
      courseName,
      courseCode,
      batchId,
      instructorName = 'Hackitise Labs',
      grade,
      duration,
      completionDate,
      score,
    } = req.body;

    if (!studentName || !studentEmail || !courseName || !courseCode || !batchId || !duration) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    const certificateId = generateCertificateId();
    const issueDate = new Date();
    const verificationHash = generateVerificationHash({
      certificateId,
      studentEmail,
      issueDate,
    });

    const certificate = await Certificate.create({
      certificateId,
      studentName,
      studentEmail,
      courseName,
      courseCode,
      batchId,
      issueDate,
      instructorName,
      grade,
      verificationHash,
      status: 'issued',
      metadata: {
        duration,
        completionDate: completionDate ? new Date(completionDate) : new Date(),
        score,
      },
    });

    // Send email
    await sendCertificateIssued({
      name: studentName,
      email: studentEmail,
      certificateId: certificate.certificateId,
      courseName,
      issueDate,
      grade,
    });

    res.status(201).json({
      success: true,
      message: 'Certificate issued successfully',
      data: certificate,
    });
  } catch (error) {
    console.error('Issue certificate error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * PUT /api/v1/certificates/:id/revoke
 * Revoke a certificate
 */
router.put('/:id/revoke', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      res.status(404).json({ success: false, message: 'Certificate not found' });
      return;
    }

    certificate.status = 'revoked';
    await certificate.save();

    res.json({ success: true, message: 'Certificate revoked', data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/v1/certificates/programs/all (admin)
 * Get all certification programs including unpublished
 */
router.get('/programs/all', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const programs = await CertificationProgram.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * POST /api/v1/certificates/programs (admin)
 * Create a certification program
 */
router.post('/programs', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const program = await CertificationProgram.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
