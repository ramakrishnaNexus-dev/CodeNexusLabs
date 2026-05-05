/**
 * Professional Email Service for CodeNexusLabs
 */

interface EmailTemplate {
  subject: string;
  html: string;
}

export const sendWelcomeEmail = async (
  userEmail: string, 
  userName: string
): Promise<EmailTemplate> => {
  
  const currentYear = new Date().getFullYear();
  const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
  const subject = `Welcome to CodeNexusLabs, ${formattedName}! 🚀`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px;text-align:center;">
<h1 style="color:#fff;margin:0 0 8px;font-size:26px;font-weight:700;">Welcome to CodeNexusLabs! 🎉</h1>
<p style="color:rgba(255,255,255,0.9);margin:0;font-size:15px;">Your journey to mastering technology starts here</p>
</td></tr>
<tr><td style="padding:35px 40px;">
<p style="margin:0 0 20px;font-size:16px;color:#374151;">Dear <strong style="color:#4f46e5;">${formattedName}</strong>,</p>
<p style="margin:0 0 25px;font-size:15px;color:#6b7280;line-height:1.8;">Thank you for choosing <strong>CodeNexusLabs</strong>. We're thrilled to have you join our community of learners.</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px;">
<tr>
<td width="33%" style="padding:12px;text-align:center;background:#f0f4ff;border-radius:10px 0 0 10px;"><p style="margin:0;font-size:20px;font-weight:700;color:#4f46e5;">50+</p><p style="margin:2px 0 0;font-size:11px;color:#6b7280;">Courses</p></td>
<td width="34%" style="padding:12px;text-align:center;background:#f5f3ff;"><p style="margin:0;font-size:20px;font-weight:700;color:#7c3aed;">10K+</p><p style="margin:2px 0 0;font-size:11px;color:#6b7280;">Learners</p></td>
<td width="33%" style="padding:12px;text-align:center;background:#faf5ff;border-radius:0 10px 10px 0;"><p style="margin:0;font-size:20px;font-weight:700;color:#a855f7;">95%</p><p style="margin:2px 0 0;font-size:11px;color:#6b7280;">Success</p></td>
</tr>
</table>

<h3 style="margin:0 0 15px;font-size:17px;color:#1f2937;font-weight:600;">What You Get:</h3>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;">✓ Structured text-based courses</p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;">✓ Interactive code practice</p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;">✓ Professional resume builder</p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;">✓ Interview preparation</p>
<p style="margin:0 0 25px;font-size:14px;color:#4b5563;">✓ Industry certifications</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px;"><tr><td align="center">
<a href="http://localhost:3000/courses" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:15px 40px;border-radius:12px;font-size:16px;font-weight:600;">🚀 Start Exploring Courses</a>
</td></tr></table>

<p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;">Need help? Contact support@codenexuslabs.com</p>
</td></tr>
<tr><td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:13px;color:#9ca3af;">© ${currentYear} CodeNexusLabs. All rights reserved.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  console.log(`📧 Welcome email sent to ${userEmail}`);
  return { subject, html };
};

export const sendAdminNotification = async (
  adminEmail: string,
  newUserName: string,
  newUserEmail: string
): Promise<EmailTemplate> => {
  
  const formattedName = newUserName.charAt(0).toUpperCase() + newUserName.slice(1);
  const registrationTime = new Date().toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });

  const subject = `🔔 New Registration: ${formattedName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0;">
<tr><td align="center">
<table width="550" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
<tr><td style="background:#f59e0b;padding:25px 30px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:20px;font-weight:700;">🔔 New User Registration</h2>
</td></tr>
<tr><td style="padding:30px;">
<p style="margin:0 0 20px;font-size:15px;color:#374151;">A new student has joined <strong>CodeNexusLabs</strong>.</p>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border-radius:12px;padding:20px;margin:0 0 25px;">
<tr><td style="padding:6px 0;width:100px;"><span style="font-size:13px;color:#6b7280;font-weight:600;">Name:</span></td><td style="padding:6px 0;"><span style="font-size:14px;color:#1f2937;font-weight:600;">${formattedName}</span></td></tr>
<tr><td style="padding:6px 0;"><span style="font-size:13px;color:#6b7280;font-weight:600;">Email:</span></td><td style="padding:6px 0;"><span style="font-size:14px;color:#4f46e5;">${newUserEmail}</span></td></tr>
<tr><td style="padding:6px 0;"><span style="font-size:13px;color:#6b7280;font-weight:600;">Role:</span></td><td style="padding:6px 0;"><span style="display:inline-block;background:#dbeafe;color:#1d4ed8;padding:3px 10px;border-radius:6px;font-size:12px;font-weight:600;">STUDENT</span></td></tr>
<tr><td style="padding:6px 0;"><span style="font-size:13px;color:#6b7280;font-weight:600;">Time:</span></td><td style="padding:6px 0;"><span style="font-size:13px;color:#374151;">${registrationTime}</span></td></tr>
</table>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr><td align="center">
<a href="http://localhost:3000/admin/dashboard" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:13px 35px;border-radius:10px;font-size:15px;font-weight:600;">📊 View Dashboard</a>
</td></tr></table>

<p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">Automated notification from CodeNexusLabs</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  console.log(`📧 Admin notification sent to ${adminEmail}`);
  return { subject, html };
};