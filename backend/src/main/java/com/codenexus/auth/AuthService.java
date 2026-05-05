package com.codenexus.auth;

import com.codenexus.security.JwtUtils;
import com.codenexus.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public String register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("STUDENT");
        user.setActive(true);
        userRepository.save(user);
        
        // Send welcome email
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getFullName());
            System.out.println("✅ Welcome email sent to: " + user.getEmail());
        } catch (Exception e) {
            System.out.println("❌ Failed to send welcome email: " + e.getMessage());
        }
        
        // Notify admin
        try {
            emailService.sendAdminNotification("codenexuslabs.dev@gmail.com", user.getFullName(), user.getEmail());
            System.out.println("✅ Admin notified about: " + user.getEmail());
        } catch (Exception e) {
            System.out.println("❌ Failed to send admin notification: " + e.getMessage());
        }
        
        return "Registration successful";
    }

    public Map<String, String> login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFullName(email.split("@")[0]);
            user.setPassword(passwordEncoder.encode(password));
            user.setActive(true);
            user.setRole("STUDENT");
            userRepository.save(user);
        }

        String token = jwtUtils.generateJwtToken(email);
        String role = "codenexuslabs.dev@gmail.com".equalsIgnoreCase(email) ? "ADMIN" : "STUDENT";

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", email);
        response.put("fullName", user.getFullName());
        response.put("role", role);

        return response;
    }
}