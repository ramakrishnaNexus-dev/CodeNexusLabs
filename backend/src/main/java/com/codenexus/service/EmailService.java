package com.codenexus.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    private boolean isReady = false;

    @PostConstruct
    public void init() {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) {
            System.out.println("❌ BREVO_API_KEY is NOT set! Emails will not work.");
            return;
        }
        if (!brevoApiKey.startsWith("xkeysib-")) {
            System.out.println("❌ BREVO_API_KEY has wrong format! Must start with 'xkeysib-'");
            return;
        }
        isReady = true;
        System.out.println("✅ EmailService ready with Brevo REST API (port 443)");
    }

    @Async
    public void sendWelcomeEmail(String to, String name) {
        if (!isReady) {
            System.out.println("❌ Welcome email not sent - EmailService not ready");
            return;
        }
        
        try {
            String htmlContent = getWelcomeEmailHtml(name);
            boolean sent = sendBrevoEmail(to, name, "Welcome to CodeNexusLabs, " + name + "! 🚀", htmlContent);
            if (sent) {
                System.out.println("✅ Welcome email sent to: " + to);
            } else {
                System.out.println("❌ Failed to send welcome email to: " + to);
            }
        } catch (Exception e) {
            System.out.println("❌ Welcome email error: " + e.getMessage());
        }
    }

    @Async
    public void sendAdminNotification(String newUserName, String newUserEmail) {
        if (!isReady) {
            System.out.println("❌ Admin notification not sent - EmailService not ready");
            return;
        }
        
        try {
            String htmlContent = getAdminNotificationHtml(newUserName, newUserEmail);
            boolean sent = sendBrevoEmail("codenexuslabs.dev@gmail.com", "Admin", "🔔 New Registration: " + newUserName, htmlContent);
            if (sent) {
                System.out.println("✅ Admin notification sent");
            } else {
                System.out.println("❌ Failed to send admin notification");
            }
        } catch (Exception e) {
            System.out.println("❌ Admin notification error: " + e.getMessage());
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String name, String resetToken) {
        if (!isReady) {
            System.out.println("❌ Reset email not sent - EmailService not ready");
            return;
        }
        
        try {
            String resetUrl = "https://code-nexus-labs.vercel.app/reset-password?token=" + resetToken;
            String htmlContent = getPasswordResetHtml(name, resetUrl);
            boolean sent = sendBrevoEmail(to, name, "Reset Your Password - CodeNexusLabs", htmlContent);
            if (sent) {
                System.out.println("✅ Password reset email sent to: " + to);
            } else {
                System.out.println("❌ Failed to send password reset email to: " + to);
            }
        } catch (Exception e) {
            System.out.println("❌ Reset email error: " + e.getMessage());
        }
    }

    private boolean sendBrevoEmail(String to, String name, String subject, String htmlContent) {
        try {
            String jsonBody = String.format(
                "{\"sender\":{\"name\":\"CodeNexusLabs\",\"email\":\"codenexuslabs.dev@gmail.com\"}," +
                "\"to\":[{\"email\":\"%s\",\"name\":\"%s\"}]," +
                "\"subject\":\"%s\"," +
                "\"htmlContent\":\"%s\"}",
                escapeJson(to), escapeJson(name), escapeJson(subject), escapeJson(htmlContent)
            );
            
            URL url = new URL("https://api.brevo.com/v3/smtp/email");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("api-key", brevoApiKey);
            conn.setDoOutput(true);
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(15000);
            
            try (OutputStream os = conn.getOutputStream()) {
                os.write(jsonBody.getBytes(StandardCharsets.UTF_8));
            }
            
            int responseCode = conn.getResponseCode();
            return responseCode == 200 || responseCode == 201;
            
        } catch (Exception e) {
            System.out.println("❌ Brevo API error: " + e.getMessage());
            return false;
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
    }

    private String getWelcomeEmailHtml(String name) {
        return "<html><body style='font-family:Arial,sans-serif;'>"
            + "<div style='max-width:600px;margin:0 auto;padding:20px;'>"
            + "<h1 style='color:#4f46e5;'>Welcome to CodeNexusLabs! 🎉</h1>"
            + "<p>Hi <strong>" + name + "</strong>,</p>"
            + "<p>Thank you for joining CodeNexusLabs. Your learning journey starts now!</p>"
            + "<a href='https://code-nexus-labs.vercel.app/courses' style='display:inline-block;background:#4f46e5;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;margin:20px 0;'>Start Learning Now</a>"
            + "<p>Need help? Contact us at support@codenexuslabs.com</p>"
            + "<p>Best regards,<br>CodeNexusLabs Team</p>"
            + "</div></body></html>";
    }

    private String getAdminNotificationHtml(String userName, String userEmail) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String currentTime = LocalDateTime.now().format(formatter);
        
        return "<html><body style='font-family:Arial,sans-serif;'>"
            + "<div style='max-width:600px;margin:0 auto;padding:20px;'>"
            + "<h1 style='color:#f59e0b;'>🔔 New User Registration</h1>"
            + "<p><strong>Name:</strong> " + userName + "</p>"
            + "<p><strong>Email:</strong> " + userEmail + "</p>"
            + "<p><strong>Time:</strong> " + currentTime + "</p>"
            + "<hr>"
            + "<a href='https://code-nexus-labs.vercel.app/admin/dashboard'>View Dashboard</a>"
            + "</div></body></html>";
    }

    private String getPasswordResetHtml(String name, String resetUrl) {
        return "<html><body style='font-family:Arial,sans-serif;'>"
            + "<div style='max-width:500px;margin:0 auto;padding:20px;'>"
            + "<h1 style='color:#4f46e5;'>Reset Your Password 🔐</h1>"
            + "<p>Hi <strong>" + name + "</strong>,</p>"
            + "<p>We received a request to reset your password. Click the button below:</p>"
            + "<a href='" + resetUrl + "' style='display:inline-block;background:#4f46e5;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;margin:20px 0;'>Reset Password</a>"
            + "<p>This link expires in <strong>1 hour</strong>.</p>"
            + "<p>If you didn't request this, please ignore this email.</p>"
            + "<hr>"
            + "<p style='font-size:12px;color:#666;'>CodeNexusLabs</p>"
            + "</div></body></html>";
    }
}