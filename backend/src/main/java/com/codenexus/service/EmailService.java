package com.codenexus.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    private HttpClient httpClient;

    @PostConstruct
    public void init() {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) {
            System.out.println("⚠️ WARNING: BREVO_API_KEY is not set!");
            return;
        }
        httpClient = HttpClient.newHttpClient();
        System.out.println("✅ EmailService ready");
    }

    @Async
    public void sendWelcomeEmail(String to, String name) {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) {
            System.out.println("❌ Email not sent - no API key");
            return;
        }
        
        try {
            String json = String.format(
                "{\"sender\":{\"name\":\"CodeNexusLabs\",\"email\":\"codenexuslabs.dev@gmail.com\"},"
                + "\"to\":[{\"email\":\"%s\",\"name\":\"%s\"}],"
                + "\"subject\":\"Welcome to CodeNexusLabs, %s! 🚀\","
                + "\"htmlContent\":\"<h1>Welcome %s!</h1><p>Thank you for joining CodeNexusLabs!</p>\"}",
                to, name, name, name);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                .header("Content-Type", "application/json")
                .header("api-key", brevoApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .timeout(Duration.ofSeconds(30))
                .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 201 || response.statusCode() == 200) {
                System.out.println("✅ Welcome email sent to: " + to);
            } else {
                System.out.println("❌ Email failed: " + response.statusCode() + " - " + response.body());
            }
        } catch (Exception e) {
            System.out.println("❌ Email error: " + e.getMessage());
        }
    }

    @Async
    public void sendAdminNotification(String newUserName, String newUserEmail) {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) return;
        
        try {
            String json = String.format(
                "{\"sender\":{\"name\":\"CodeNexusLabs\",\"email\":\"codenexuslabs.dev@gmail.com\"},"
                + "\"to\":[{\"email\":\"codenexuslabs.dev@gmail.com\",\"name\":\"Admin\"}],"
                + "\"subject\":\"🔔 New Registration: %s\","
                + "\"htmlContent\":\"<h1>New User</h1><p>Name: %s<br>Email: %s</p>\"}",
                newUserName, newUserName, newUserEmail);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                .header("Content-Type", "application/json")
                .header("api-key", brevoApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
            
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("✅ Admin notification sent");
        } catch (Exception e) {
            System.out.println("❌ Admin notify failed: " + e.getMessage());
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String name, String resetToken) {
        if (brevoApiKey == null || brevoApiKey.isEmpty()) return;
        
        try {
            String resetUrl = "https://code-nexus-labs.vercel.app/reset-password?token=" + resetToken;
            String json = String.format(
                "{\"sender\":{\"name\":\"CodeNexusLabs\",\"email\":\"codenexuslabs.dev@gmail.com\"},"
                + "\"to\":[{\"email\":\"%s\",\"name\":\"%s\"}],"
                + "\"subject\":\"Reset Your Password - CodeNexusLabs\","
                + "\"htmlContent\":\"<h1>Reset Password</h1><p>Hi %s,</p><a href='%s'>Click here to reset</a>\"}",
                to, name, name, resetUrl);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                .header("Content-Type", "application/json")
                .header("api-key", brevoApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
            
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("✅ Password reset email sent to: " + to);
        } catch (Exception e) {
            System.out.println("❌ Reset email failed: " + e.getMessage());
        }
    }
}