import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

const createTransporter = () => {
  if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
    console.warn('⚠️  SMTP credentials not set — emails will be logged to console only.');
    return null;
  }
  return nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: { user: ENV.SMTP_USER, pass: ENV.SMTP_PASS },
  });
};

const transporter = createTransporter();

const sendOrLog = async (mailOptions: nodemailer.SendMailOptions): Promise<void> => {
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${mailOptions.to}`);
    } catch (err) {
      console.error('❌ Email failed:', err);
    }
  } else {
    console.log('📧 [MOCK EMAIL]', JSON.stringify({ to: mailOptions.to, subject: mailOptions.subject }, null, 2));
  }
};

export const sendContactNotification = async (data: { name: string; email: string; phone?: string; message: string }) => {
  await sendOrLog({
    from: `"Hackitise Labs Website" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: ENV.CONTACT_EMAIL,
    subject: `New Contact Inquiry from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
};

export const sendApplicationNotification = async (
  data: { name: string; email: string; message?: string; role?: string },
  resumePath?: string
) => {
  const attachments = resumePath ? [{ path: resumePath }] : [];
  await sendOrLog({
    from: `"Hackitise Labs Careers" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: ENV.HR_EMAIL,
    subject: `New Application: ${data.name}${data.role ? ` — ${data.role}` : ''}`,
    html: `
      <h2>New Career Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong></p><p>${data.message}</p>` : ''}
      ${resumePath ? '<p><em>Resume attached.</em></p>' : ''}
    `,
    attachments,
  });
};

export const sendCertificateRequestConfirmation = async (data: {
  name: string;
  email: string;
  courseName: string;
  batchId: string;
  requestId: string;
}) => {
  await sendOrLog({
    from: `"Hackitise Labs Certifications" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: data.email,
    subject: 'Certificate Request Received - Hackitise Labs',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f3d3e;">Certificate Request Received</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for requesting your certificate!</p>
        
        <div style="background: #f0f3f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0f3d3e;">Your Request Details:</h3>
          <p><strong>Course:</strong> ${data.courseName}</p>
          <p><strong>Batch ID:</strong> ${data.batchId}</p>
          <p><strong>Request ID:</strong> ${data.requestId}</p>
        </div>
        
        <p>Our team will review your request within 2-3 business days.</p>
        <p>Once approved, your certificate will be sent to this email address.</p>
        
        <p style="margin-top: 30px;">Need help? Reply to this email or contact us at <a href="mailto:info@hackitiselabs.in">info@hackitiselabs.in</a></p>
        
        <p style="color: #666; margin-top: 30px;">Best regards,<br>Hackitise Labs Team</p>
      </div>
    `,
  });
};

export const sendCertificateRequestNotification = async (data: {
  name: string;
  email: string;
  phone?: string;
  courseName: string;
  batchId: string;
  message?: string;
  requestId: string;
}) => {
  await sendOrLog({
    from: `"Hackitise Labs System" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: ENV.HR_EMAIL,
    subject: `New Certificate Request - ${data.name}`,
    html: `
      <h2>New Certificate Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Course:</strong> ${data.courseName}</p>
      <p><strong>Batch ID:</strong> ${data.batchId}</p>
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      <p><strong>Request ID:</strong> ${data.requestId}</p>
      
      <p style="margin-top: 20px;">Review this request in the admin panel.</p>
    `,
  });
};

export const sendCertificateIssued = async (data: {
  name: string;
  email: string;
  certificateId: string;
  courseName: string;
  issueDate: Date;
  grade?: string;
}) => {
  const verifyUrl = `${ENV.FRONTEND_URL}/certification/verify/${data.certificateId}`;
  
  await sendOrLog({
    from: `"Hackitise Labs Certifications" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: data.email,
    subject: '🎓 Your Hackitise Labs Certificate is Ready!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f3d3e;">🎉 Congratulations ${data.name}!</h2>
        <p>Your certificate has been issued!</p>
        
        <div style="background: linear-gradient(135deg, #0f3d3e 0%, #145c5e 100%); color: white; padding: 30px; border-radius: 15px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0;">Certificate Details</h3>
          <p><strong>Certificate ID:</strong> ${data.certificateId}</p>
          <p><strong>Course:</strong> ${data.courseName}</p>
          <p><strong>Issue Date:</strong> ${data.issueDate.toLocaleDateString()}</p>
          ${data.grade ? `<p><strong>Grade:</strong> ${data.grade}</p>` : ''}
        </div>
        
        <p>Verify your certificate: <a href="${verifyUrl}" style="color: #0f3d3e; font-weight: bold;">${verifyUrl}</a></p>
        
        <p style="margin-top: 30px;">Share your achievement on LinkedIn, Twitter, and Instagram!</p>
        
        <p style="color: #666; margin-top: 30px;">Proud of your achievement,<br>Hackitise Labs Team</p>
      </div>
    `,
  });
};

export const sendCertificateRejected = async (data: {
  name: string;
  email: string;
  courseName: string;
  reason: string;
}) => {
  await sendOrLog({
    from: `"Hackitise Labs Certifications" <${ENV.SMTP_USER || 'noreply@hackitiselabs.in'}>`,
    to: data.email,
    subject: 'Certificate Request Update - Hackitise Labs',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f3d3e;">Certificate Request Update</h2>
        <p>Hi ${data.name},</p>
        
        <p>We've reviewed your certificate request for <strong>${data.courseName}</strong>.</p>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Unfortunately, we cannot issue your certificate at this time.</strong></p>
          <p style="margin-top: 10px;"><strong>Reason:</strong> ${data.reason}</p>
        </div>
        
        <p>If you believe this is an error, please contact us at <a href="mailto:Hr@hackitiselabs.in">Hr@hackitiselabs.in</a></p>
        
        <p style="color: #666; margin-top: 30px;">Best regards,<br>Hackitise Labs Team</p>
      </div>
    `,
  });
};
