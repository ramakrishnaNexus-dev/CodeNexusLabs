package com.codenexus.resume;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeRepository resumeRepository;
    private final JwtUtils jwtUtils;

    private String getEmailFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                return jwtUtils.getEmailFromToken(authHeader.substring(7));
            } catch (Exception ignored) {}
        }
        return "unknown";
    }

    @PostMapping("/save")
    public ApiResponse<Resume> saveResume(@RequestBody Resume resume,
                                          @RequestHeader(value = "Authorization", required = false) String auth) {
        String email = getEmailFromToken(auth);
        resume.setUserEmail(email);
        resume.setUserId(null); // Will be set if user exists
        Resume saved = resumeRepository.save(resume);
        return ApiResponse.success(saved, "Resume saved");
    }

    @GetMapping("/my")
    public ApiResponse<List<Resume>> getMyResumes(@RequestHeader(value = "Authorization", required = false) String auth) {
        String email = getEmailFromToken(auth);
        return ApiResponse.success(resumeRepository.findByUserEmail(email), "Resumes fetched");
    }

    @GetMapping("/latest")
    public ApiResponse<Resume> getLatest(@RequestHeader(value = "Authorization", required = false) String auth) {
        String email = getEmailFromToken(auth);
        Resume resume = resumeRepository.findTopByUserEmailOrderByUpdatedAtDesc(email).orElse(null);
        return ApiResponse.success(resume, "Latest resume");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteResume(@PathVariable Long id) {
        resumeRepository.deleteById(id);
        return ApiResponse.success("Deleted", "Resume deleted");
    }
}