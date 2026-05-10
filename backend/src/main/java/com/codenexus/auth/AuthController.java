package com.codenexus.auth;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import com.codenexus.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody User user) {
        return ApiResponse.success(authService.register(user), "Registration successful");
    }

    @PostMapping("/login")
    public ApiResponse<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        return ApiResponse.success(
            authService.login(credentials.get("email"), credentials.get("password")),
            "Login successful"
        );
    }

    @PostMapping("/google")
    public ApiResponse<Map<String, String>> googleLogin(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String name = body.get("name");

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFullName(name != null ? name : email.split("@")[0]);
            user.setPassword(passwordEncoder.encode("GOOGLE_OAUTH_" + System.currentTimeMillis()));
            user.setRole("STUDENT");
            user.setActive(true);
            userRepository.save(user);
        }

        String token = jwtUtils.generateJwtToken(email);
        String role = "codenexuslabs.dev@gmail.com".equalsIgnoreCase(email) ? "ADMIN" : "STUDENT";

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", email);
        response.put("fullName", user.getFullName());
        response.put("role", role);

        return ApiResponse.success(response, "Google login successful");
    }

    // ========== FORGOT PASSWORD ==========
    
    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        
        if (email == null || email.isEmpty()) {
            return ApiResponse.error("Email is required");
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            // Don't reveal if email exists or not (security)
            return ApiResponse.success("If the email exists, a reset link has been sent", "Check your email");
        }

        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Valid for 1 hour
        userRepository.save(user);

        // Send reset email
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), user.getFullName(), resetToken);
        } catch (Exception ignored) {}

        return ApiResponse.success("If the email exists, a reset link has been sent", "Check your email");
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("password");

        if (token == null || newPassword == null) {
            return ApiResponse.error("Token and password are required");
        }

        if (newPassword.length() < 8) {
            return ApiResponse.error("Password must be at least 8 characters");
        }

        User user = userRepository.findByResetToken(token).orElse(null);
        if (user == null) {
            return ApiResponse.error("Invalid or expired reset token");
        }

        if (user.getResetTokenExpiry() != null && user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ApiResponse.error("Reset token has expired");
        }

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ApiResponse.success("Password reset successful", "You can now login");
    }
}