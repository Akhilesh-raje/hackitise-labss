import crypto from 'crypto';

/**
 * Generate unique certificate ID
 * Format: HACK-CERT-YYYY-XXXXXX
 */
export const generateCertificateId = (): string => {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `HACK-CERT-${year}-${random}`;
};

/**
 * Generate verification hash for certificate authenticity
 */
export const generateVerificationHash = (certificateData: {
  certificateId: string;
  studentEmail: string;
  issueDate: Date;
}): string => {
  const secret = process.env.JWT_SECRET || 'hackitise-secret';
  const data = `${certificateData.certificateId}:${certificateData.studentEmail}:${certificateData.issueDate.toISOString()}:${secret}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Verify certificate hash
 */
export const verifyHash = (
  certificateData: {
    certificateId: string;
    studentEmail: string;
    issueDate: Date;
  },
  hash: string
): boolean => {
  const expectedHash = generateVerificationHash(certificateData);
  return expectedHash === hash;
};
