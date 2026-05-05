package com.codenexus.auth;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

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
}