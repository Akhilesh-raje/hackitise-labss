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
