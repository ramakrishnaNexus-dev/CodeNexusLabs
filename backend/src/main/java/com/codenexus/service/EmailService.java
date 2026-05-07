package com.codenexus.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${SENDGRID_API_KEY}")
    private String sendGridApiKey;

    @Value("${ADMIN_EMAIL:codenexuslabs.dev@gmail.com}")
    private String adminEmail;

    @Async
    public void sendWelcomeEmail(String to, String name) {
        try {
            Email from = new Email("codenexuslabs.dev@gmail.com");
            Email recipient = new Email(to);
            String subject = "Welcome to CodeNexusLabs, " + name + "! 🚀";

            String html = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head>"
                + "<body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;'>"
                + "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center' style='padding:40px 20px;'>"
                + "<table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:16px;overflow:hidden;'>"

                + "<tr><td style='background:linear-gradient(135deg,#4f46e5,#6366f1);padding:40px 30px;text-align:center;'>"
                + "<h1 style='color:#ffffff;margin:0;font-size:26px;'>Welcome to CodeNexusLabs! 🎉</h1>"
                + "<p style='color:#c7d2fe;margin:10px 0 0;font-size:15px;'>Your journey to mastering technology starts here</p>"
                + "</td></tr>"

                + "<tr><td style='padding:35px 30px;'>"
                + "<p style='font-size:16px;color:#374151;margin:0 0 15px;'>Hi <strong style='color:#4f46e5;'>" + name + "</strong>,</p>"
                + "<p style='font-size:15px;color:#6b7280;line-height:1.7;margin:0 0 25px;'>Thank you for choosing <strong>CodeNexusLabs</strong>. We're thrilled to have you join our community of ambitious learners.</p>"

                + "<table width='100%' cellpadding='0' cellspacing='0' style='margin:0 0 25px;'>"
                + "<tr>"
                + "<td style='background:#eef2ff;padding:15px;text-align:center;border-radius:10px 0 0 10px;'><p style='margin:0;font-size:20px;font-weight:700;color:#4f46e5;'>50+</p><p style='margin:5px 0 0;font-size:11px;color:#6b7280;'>Expert Courses</p></td>"
                + "<td style='background:#f5f3ff;padding:15px;text-align:center;'><p style='margin:0;font-size:20px;font-weight:700;color:#7c3aed;'>10K+</p><p style='margin:5px 0 0;font-size:11px;color:#6b7280;'>Active Learners</p></td>"
                + "<td style='background:#faf5ff;padding:15px;text-align:center;border-radius:0 10px 10px 0;'><p style='margin:0;font-size:20px;font-weight:700;color:#a855f7;'>95%</p><p style='margin:5px 0 0;font-size:11px;color:#6b7280;'>Success Rate</p></td>"
                + "</tr></table>"

                + "<p style='font-size:14px;color:#374151;margin:0 0 10px;'><strong>What you get:</strong></p>"
                + "<p style='font-size:14px;color:#6b7280;margin:0 0 5px;'>✅ Structured text-based courses</p>"
                + "<p style='font-size:14px;color:#6b7280;margin:0 0 5px;'>✅ Interactive code practice</p>"
                + "<p style='font-size:14px;color:#6b7280;margin:0 0 5px;'>✅ Professional resume builder</p>"
                + "<p style='font-size:14px;color:#6b7280;margin:0 0 20px;'>✅ Interview preparation</p>"

                + "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center' style='padding:20px 0 25px;'>"
                + "<a href='https://code-nexus-labs.vercel.app/courses' style='display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:16px;font-weight:600;'>🚀 Start Exploring Courses</a>"
                + "</td></tr></table>"

                + "<p style='font-size:13px;color:#9ca3af;text-align:center;margin:0;'>Need help? Contact support@codenexuslabs.com</p>"
                + "</td></tr>"

                + "<tr><td style='background:#f9fafb;padding:20px 30px;text-align:center;border-top:1px solid #e5e7eb;'>"
                + "<p style='margin:0;font-size:12px;color:#9ca3af;'>© 2026 CodeNexusLabs. All rights reserved.</p>"
                + "</td></tr>"

                + "</table></td></tr></table></body></html>";

            Content content = new Content("text/html", html);
            Mail mail = new Mail(from, subject, recipient, content);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            System.out.println("✅ Welcome email sent to: " + to + " | Status: " + response.getStatusCode());
        } catch (Exception e) {
            System.out.println("❌ Email failed: " + e.getMessage());
        }
    }

    @Async
    public void sendAdminNotification(String newUserName, String newUserEmail) {
        try {
            Email from = new Email("codenexuslabs.dev@gmail.com");
            Email recipient = new Email(adminEmail);
            String subject = "🔔 New Registration: " + newUserName;

            String html = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head>"
                + "<body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;'>"
                + "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center' style='padding:40px 20px;'>"
                + "<table width='550' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:16px;overflow:hidden;'>"

                + "<tr><td style='background:#f59e0b;padding:25px;text-align:center;'>"
                + "<h2 style='color:#ffffff;margin:0;font-size:20px;'>🔔 New User Registration</h2>"
                + "</td></tr>"

                + "<tr><td style='padding:30px;'>"
                + "<p style='font-size:15px;color:#374151;margin:0 0 20px;'>A new student has registered on <strong>CodeNexusLabs</strong>:</p>"
                + "<table width='100%' cellpadding='10' style='background:#f0f4ff;border-radius:10px;margin:0 0 20px;'>"
                + "<tr><td style='color:#6b7280;font-size:13px;'>Name:</td><td style='color:#1f2937;font-weight:600;'>" + newUserName + "</td></tr>"
                + "<tr><td style='color:#6b7280;font-size:13px;'>Email:</td><td style='color:#4f46e5;'>" + newUserEmail + "</td></tr>"
                + "<tr><td style='color:#6b7280;font-size:13px;'>Time:</td><td style='color:#374151;'>" + java.time.LocalDateTime.now().toString() + "</td></tr>"
                + "</table>"
                + "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center'>"
                + "<a href='https://code-nexus-labs.vercel.app/admin/dashboard' style='display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 30px;border-radius:10px;font-size:15px;font-weight:600;'>📊 View Dashboard</a>"
                + "</td></tr></table>"
                + "</td></tr>"

                + "</table></td></tr></table></body></html>";

            Content content = new Content("text/html", html);
            Mail mail = new Mail(from, subject, recipient, content);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            System.out.println("✅ Admin notified at: " + adminEmail + " | Status: " + response.getStatusCode());
        } catch (Exception e) {
            System.out.println("❌ Admin notify failed: " + e.getMessage());
        }
    }
}