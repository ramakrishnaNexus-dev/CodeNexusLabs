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
            // Create JSON payload
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
            
            // Write request body
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            
            // Get response
            int responseCode = conn.getResponseCode();
            System.out.println("📡 Brevo API response code: " + responseCode);
            
            // Read response body for debugging
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
    return "<!DOCTYPE html>"
        + "<html><head><meta charset='UTF-8'>"
        + "<style>"
        + "body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;}"
        + ".container{max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);}"
        + ".header{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:48px 32px;text-align:center;}"
        + ".header h1{color:#ffffff;font-size:28px;margin:0;font-weight:700;}"
        + ".header p{color:#e0e7ff;font-size:15px;margin:12px 0 0 0;}"
        + ".content{padding:36px 32px;}"
        + ".greeting{font-size:20px;color:#1e293b;margin-bottom:16px;}"
        + ".greeting strong{color:#4f46e5;}"
        + ".text{color:#475569;font-size:15px;line-height:1.7;margin-bottom:20px;}"
        + ".stats{background:linear-gradient(135deg,#eef2ff 0%,#f5f3ff 100%);border-radius:16px;padding:28px;margin:24px 0;display:flex;justify-content:space-around;text-align:center;}"
        + ".stat{flex:1;}"
        + ".stat-num{font-size:32px;font-weight:700;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}"
        + ".stat-label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-top:6px;font-weight:600;}"
        + ".features{margin:28px 0;}"
        + ".features h3{font-size:16px;color:#1e293b;margin-bottom:16px;font-weight:600;}"
        + ".feature-item{display:flex;align-items:flex-start;margin-bottom:12px;color:#475569;font-size:14px;line-height:1.5;}"
        + ".feature-icon{color:#6366f1;font-size:16px;margin-right:10px;margin-top:2px;}"
        + ".cta{text-align:center;margin:32px 0 24px 0;}"
        + ".cta a{display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:10px;font-weight:600;font-size:16px;box-shadow:0 4px 15px rgba(99,102,241,0.4);}"
        + ".cta a .rocket{font-size:20px;margin-right:6px;vertical-align:middle;display:inline-block;}"
        + ".footer{text-align:center;padding:28px;background:#f8fafc;border-top:1px solid #e2e8f0;}"
        + ".footer p{color:#94a3b8;font-size:13px;margin:0 0 6px 0;}"
        + ".footer a{color:#6366f1;text-decoration:none;}"
        + "</style></head><body>"
        + "<div class='container'>"
        + "<div class='header'>"
        + "<h1>Welcome to CodeNexusLabs! 🎉</h1>"
        + "<p>Your journey to mastering technology starts here</p>"
        + "</div>"
        + "<div class='content'>"
        + "<div class='greeting'>Hi <strong>" + name + "</strong>,</div>"
        + "<div class='text'>Thank you for joining CodeNexusLabs. Your learning journey starts now!</div>"
        + "<div class='stats'>"
        + "<div class='stat'><div class='stat-num'>50+</div><div class='stat-label'>Expert Courses</div></div>"
        + "<div class='stat'><div class='stat-num'>10K+</div><div class='stat-label'>Active Learners</div></div>"
        + "<div class='stat'><div class='stat-num'>95%</div><div class='stat-label'>Success Rate</div></div>"
        + "</div>"
        + "<div class='features'>"
        + "<h3>What you get:</h3>"
        + "<div class='feature-item'><span class='feature-icon'>✅</span>Structured text-based courses with real-world projects</div>"
        + "<div class='feature-item'><span class='feature-icon'>✅</span>Interactive code practice in browser</div>"
        + "<div class='feature-item'><span class='feature-icon'>✅</span>Professional resume builder & portfolio guidance</div>"
        + "<div class='feature-item'><span class='feature-icon'>✅</span>Interview preparation with mock tests</div>"
        + "</div>"
        + "<div class='cta'><a href='https://code-nexus-labs.vercel.app/courses'><span class='rocket'>🚀</span>Start Exploring Courses</a></div>"
        + "<div class='text'>Need help? Contact us at <a href='mailto:support@codenexuslabs.com'>support@codenexuslabs.com</a></div>"
        + "<div class='text'>Best regards,<br>CodeNexusLabs Team</div>"
        + "</div>"
        + "<div class='footer'>"
        + "<p>© 2026 CodeNexusLabs. All rights reserved.</p>"
        + "</div></div></body></html>";
}

private String getAdminNotificationHtml(String userName, String userEmail) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");
    String currentTime = LocalDateTime.now().format(formatter);
    
    return "<!DOCTYPE html>"
        + "<html><head><meta charset='UTF-8'>"
        + "<style>"
        + "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');"
        + "body{font-family:'Inter',Arial,sans-serif;margin:0;padding:0;background:#f8fafc;}"
        + ".container{max-width:500px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}"
        + ".header{background:linear-gradient(135deg,#f59e0b 0%,#f97316 100%);padding:32px;text-align:center;}"
        + ".header h1{color:#ffffff;font-size:22px;font-weight:700;margin:0;}"
        + ".header-icon{font-size:40px;margin-bottom:8px;}"
        + ".content{padding:32px;}"
        + ".alert{background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:16px;margin-bottom:24px;}"
        + ".alert-title{color:#92400e;font-weight:600;font-size:14px;margin-bottom:4px;}"
        + ".alert-text{color:#a16207;font-size:13px;}"
        + ".detail{margin-bottom:16px;}"
        + ".detail-label{font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:4px;}"
        + ".detail-value{font-size:15px;color:#1e293b;font-weight:500;}"
        + ".time{color:#64748b;font-size:13px;margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;}"
        + ".cta{text-align:center;margin-top:24px;}"
        + ".cta a{display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;}"
        + ".footer{text-align:center;padding:24px;background:#f8fafc;}"
        + ".footer p{color:#94a3b8;font-size:12px;margin:0;}"
        + "</style></head><body>"
        + "<div class='container'>"
        + "<div class='header'>"
        + "<div class='header-icon'>🔔</div>"
        + "<h1>New User Registration</h1>"
        + "</div>"
        + "<div class='content'>"
        + "<div class='alert'>"
        + "<div class='alert-title'>Action Required</div>"
        + "<div class='alert-text'>A new user has registered on CodeNexusLabs. Review their details below.</div>"
        + "</div>"
        + "<div class='detail'><div class='detail-label'>Full Name</div><div class='detail-value'>" + userName + "</div></div>"
        + "<div class='detail'><div class='detail-label'>Email Address</div><div class='detail-value'>" + userEmail + "</div></div>"
        + "<div class='time'>📅 Registered on " + currentTime + "</div>"
        + "<div class='cta'><a href='https://code-nexus-labs.vercel.app/admin/dashboard'>View Dashboard</a></div>"
        + "</div>"
        + "<div class='footer'>"
        + "<p>CodeNexusLabs Admin Notifications</p>"
        + "</div></div></body></html>";
}
private String getPasswordResetHtml(String name, String resetUrl) {
    return "<!DOCTYPE html>"
        + "<html><head><meta charset='UTF-8'>"
        + "<style>"
        + "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');"
        + "body{font-family:'Inter',Arial,sans-serif;margin:0;padding:0;background:#f8fafc;}"
        + ".container{max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}"
        + ".header{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:40px 32px;text-align:center;}"
        + ".header-icon{font-size:48px;margin-bottom:12px;}"
        + ".header h1{color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px 0;}"
        + ".header p{color:#e0e7ff;font-size:14px;margin:0;}"
        + ".content{padding:40px 32px;text-align:center;}"
        + ".greeting{font-size:18px;font-weight:600;color:#1e293b;margin-bottom:16px;}"
        + ".greeting span{color:#4f46e5;}"
        + ".message{color:#64748b;font-size:14px;line-height:1.7;margin-bottom:32px;}"
        + ".cta a{display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:12px;font-weight:600;font-size:15px;box-shadow:0 4px 14px rgba(79,70,229,0.35);}"
        + ".expiry{background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin:28px 0;text-align:left;}"
        + ".expiry-icon{color:#ef4444;font-size:20px;margin-right:8px;}"
        + ".expiry-title{color:#991b1b;font-weight:600;font-size:14px;}"
        + ".expiry-text{color:#b91c1c;font-size:13px;margin-top:4px;}"
        + ".ignore{color:#94a3b8;font-size:13px;margin-top:24px;}"
        + ".footer{text-align:center;padding:24px;background:#f8fafc;}"
        + ".footer p{color:#94a3b8;font-size:12px;margin:0;}"
        + "</style></head><body>"
        + "<div class='container'>"
        + "<div class='header'>"
        + "<div class='header-icon'>🔐</div>"
        + "<h1>Reset Your Password</h1>"
        + "<p>Secure your account in just one click</p>"
        + "</div>"
        + "<div class='content'>"
        + "<div class='greeting'>Hi <span>" + name + "</span>,</div>"
        + "<div class='message'>We received a request to reset your password for your CodeNexusLabs account. Click the button below to set a new password.</div>"
        + "<div class='cta'><a href='" + resetUrl + "'>Reset Password</a></div>"
        + "<div class='expiry'>"
        + "<span class='expiry-icon'>⏰</span>"
        + "<span class='expiry-title'>This link expires in 1 hour</span>"
        + "<div class='expiry-text'>For security reasons, this link will become invalid after 60 minutes. If you need a new link, request another reset.</div>"
        + "</div>"
        + "<div class='ignore'>Didn't request this? You can safely ignore this email. Your account remains secure.</div>"
        + "</div>"
        + "<div class='footer'>"
        + "<p>© 2026 CodeNexusLabs. All rights reserved.</p>"
        + "</div></div></body></html>";
}
}