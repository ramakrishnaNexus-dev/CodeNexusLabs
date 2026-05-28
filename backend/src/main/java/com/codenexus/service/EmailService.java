package com.codenexus.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Value("${brevo.api.key:}")
    private String brevoApiKey;

    private boolean isReady = false;

    @PostConstruct
    public void init() {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) {
            System.out.println("❌ BREVO_API_KEY is NOT set! Emails will not work.");
            return;
        }
        if (!brevoApiKey.startsWith("xkeysib-")) {
            System.out.println("❌ BREVO_API_KEY has wrong format! Must start with 'xkeysib-'. Current: " + brevoApiKey.substring(0, Math.min(20, brevoApiKey.length())) + "...");
            return;
        }
        isReady = true;
        System.out.println("✅ EmailService ready with Brevo REST API (port 443)");
        System.out.println("🔑 API Key starts with: " + brevoApiKey.substring(0, 15) + "...");
    }

    @Async
    public void sendWelcomeEmail(String to, String name) {
        System.out.println("📧 Sending welcome email to: " + to);
        
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
            e.printStackTrace();
        }
    }

    @Async
    public void sendAdminNotification(String newUserName, String newUserEmail) {
        System.out.println("📧 Sending admin notification for: " + newUserName);
        
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
            e.printStackTrace();
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String name, String resetToken) {
        System.out.println("📧 Sending password reset email to: " + to);
        
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
            e.printStackTrace();
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
            
            System.out.println("📡 Sending request to Brevo API...");
            System.out.println("📝 To: " + to);
            System.out.println("📝 Subject: " + subject);
            
            URL url = new URL("https://api.brevo.com/v3/smtp/email");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("api-key", brevoApiKey);
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(15000);
            
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            
            int responseCode = conn.getResponseCode();
            System.out.println("📡 Brevo API response code: " + responseCode);
            
            if (responseCode >= 400) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("❌ Brevo API error response: " + response.toString());
                }
            } else if (responseCode == 200 || responseCode == 201) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("✅ Brevo API success: " + response.toString());
                }
            }
            
            return responseCode == 200 || responseCode == 201;
            
        } catch (Exception e) {
            System.out.println("❌ Brevo API exception: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
    }

    private String getWelcomeEmailHtml(String name) {
        return "<html><body style='font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;'>"
            + "<div style='max-width:600px;margin:0 auto;background:#ffffff;'>"
            + "<div style='background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;text-align:center;'>"
            + "<h1 style='color:#ffffff;font-size:26px;margin:0;'>Welcome to CodeNexusLabs! 🎉</h1>"
            + "<p style='color:#e0e0ff;font-size:14px;margin:8px 0 0 0;'>Your journey to mastering technology starts here</p>"
            + "</div>"
            + "<div style='padding:32px;'>"
            + "<div style='font-size:18px;color:#333;margin-bottom:16px;'>Hi <strong style='color:#667eea;'>" + name + "</strong>,</div>"
            + "<div style='color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;'>Thank you for joining CodeNexusLabs. Your learning journey starts now!</div>"
            + "<div style='background:#667eea;border-radius:12px;padding:24px;margin:24px 0;text-align:center;color:#ffffff;'>"
            + "<div style='display:inline-block;margin:0 20px;'>"
            + "<div style='font-size:28px;font-weight:bold;'>50+</div>"
            + "<div style='font-size:11px;text-transform:uppercase;opacity:0.9;'>Expert Courses</div></div>"
            + "<div style='display:inline-block;margin:0 20px;'>"
            + "<div style='font-size:28px;font-weight:bold;'>10K+</div>"
            + "<div style='font-size:11px;text-transform:uppercase;opacity:0.9;'>Active Learners</div></div>"
            + "<div style='display:inline-block;margin:0 20px;'>"
            + "<div style='font-size:28px;font-weight:bold;'>95%</div>"
            + "<div style='font-size:11px;text-transform:uppercase;opacity:0.9;'>Success Rate</div></div>"
            + "</div>"
            + "<div style='margin:24px 0;'>"
            + "<h3 style='font-size:16px;color:#333;margin-bottom:16px;'>What you get:</h3>"
            + "<div style='margin-bottom:12px;color:#555;font-size:14px;'>✅ Structured text-based courses with real-world projects</div>"
            + "<div style='margin-bottom:12px;color:#555;font-size:14px;'>✅ Interactive code practice in browser</div>"
            + "<div style='margin-bottom:12px;color:#555;font-size:14px;'>✅ Professional resume builder & portfolio guidance</div>"
            + "<div style='margin-bottom:12px;color:#555;font-size:14px;'>✅ Interview preparation with mock tests</div>"
            + "</div>"
            + "<div style='text-align:center;margin:28px 0;'>"
            + "<a href='https://code-nexus-labs.vercel.app/courses' style='display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;'>🚀 Start Exploring Courses</a>"
            + "</div>"
            + "<div style='color:#555;font-size:14px;line-height:1.6;margin-bottom:12px;'>Need help? Contact us at <a href='mailto:support@codenexuslabs.com' style='color:#667eea;text-decoration:none;'>support@codenexuslabs.com</a></div>"
            + "<div style='color:#555;font-size:14px;line-height:1.6;'>Best regards,<br>CodeNexusLabs Team</div>"
            + "</div>"
            + "<div style='text-align:center;padding:24px;background:#f9f9f9;color:#999;font-size:12px;'>"
            + "© 2026 CodeNexusLabs. All rights reserved."
            + "</div></div></body></html>";
    }

    private String getAdminNotificationHtml(String userName, String userEmail) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");
        String currentTime = LocalDateTime.now().format(formatter);
        
        return "<html><body style='font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;'>"
            + "<div style='max-width:500px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);'>"
            + "<div style='background:linear-gradient(135deg,#f59e0b 0%,#f97316 100%);padding:32px;text-align:center;'>"
            + "<div style='font-size:40px;margin-bottom:8px;'>🔔</div>"
            + "<h1 style='color:#ffffff;font-size:22px;font-weight:700;margin:0;'>New User Registration</h1>"
            + "</div>"
            + "<div style='padding:32px;'>"
            + "<div style='background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:16px;margin-bottom:24px;'>"
            + "<div style='color:#92400e;font-weight:600;font-size:14px;margin-bottom:4px;'>Action Required</div>"
            + "<div style='color:#a16207;font-size:13px;'>A new user has registered on CodeNexusLabs. Review their details below.</div>"
            + "</div>"
            + "<div style='margin-bottom:16px;'>"
            + "<div style='font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:4px;'>Full Name</div>"
            + "<div style='font-size:15px;color:#1e293b;font-weight:500;'>" + userName + "</div>"
            + "</div>"
            + "<div style='margin-bottom:16px;'>"
            + "<div style='font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:4px;'>Email Address</div>"
            + "<div style='font-size:15px;color:#1e293b;font-weight:500;'>" + userEmail + "</div>"
            + "</div>"
            + "<div style='color:#64748b;font-size:13px;margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;'>📅 Registered on " + currentTime + "</div>"
            + "<div style='text-align:center;margin-top:24px;'>"
            + "<a href='https://code-nexus-labs.vercel.app/admin/dashboard' style='display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;'>View Dashboard</a>"
            + "</div>"
            + "</div>"
            + "<div style='text-align:center;padding:24px;background:#f8fafc;'>"
            + "<p style='color:#94a3b8;font-size:12px;margin:0;'>CodeNexusLabs Admin Notifications</p>"
            + "</div></div></body></html>";
    }

    private String getPasswordResetHtml(String name, String resetUrl) {
        return "<html><body style='font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;'>"
            + "<div style='max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);'>"
            + "<div style='background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 32px;text-align:center;'>"
            + "<div style='font-size:48px;margin-bottom:12px;'>🔐</div>"
            + "<h1 style='color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px 0;'>Reset Your Password</h1>"
            + "<p style='color:#e0e7ff;font-size:14px;margin:0;'>Secure your account in just one click</p>"
            + "</div>"
            + "<div style='padding:40px 32px;text-align:center;'>"
            + "<div style='font-size:18px;font-weight:600;color:#1e293b;margin-bottom:16px;'>Hi <span style='color:#4f46e5;'>" + name + "</span>,</div>"
            + "<div style='color:#64748b;font-size:14px;line-height:1.7;margin-bottom:32px;'>We received a request to reset your password for your CodeNexusLabs account. Click the button below to set a new password.</div>"
            + "<div style='margin:32px 0;'>"
            + "<a href='" + resetUrl + "' style='display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:12px;font-weight:600;font-size:15px;box-shadow:0 4px 14px rgba(102,126,234,0.4);'>Reset Password</a>"
            + "</div>"
            + "<div style='background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin:28px 0;text-align:left;'>"
            + "<span style='color:#ef4444;font-size:20px;margin-right:8px;'>⏰</span>"
            + "<span style='color:#991b1b;font-weight:600;font-size:14px;'>This link expires in 1 hour</span>"
            + "<div style='color:#b91c1c;font-size:13px;margin-top:4px;'>For security reasons, this link will become invalid after 60 minutes. If you need a new link, request another reset.</div>"
            + "</div>"
            + "<div style='color:#94a3b8;font-size:13px;margin-top:24px;'>Didn't request this? You can safely ignore this email. Your account remains secure.</div>"
            + "</div>"
            + "<div style='text-align:center;padding:24px;background:#f8fafc;'>"
            + "<p style='color:#94a3b8;font-size:12px;margin:0;'>© 2026 CodeNexusLabs. All rights reserved.</p>"
            + "</div></div></body></html>";
    }
}