package com.codenexus.resume;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;
    private final JwtUtils jwtUtils;

    public ResumeController(ResumeService resumeService, JwtUtils jwtUtils) {
        this.resumeService = resumeService;
        this.jwtUtils = jwtUtils;
    }

    private String getEmailFromRequest(HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new Exception("No valid token provided");
        }
        String token = authHeader.substring(7);
        
        if (!jwtUtils.validateToken(token)) {
            throw new Exception("Invalid token");
        }
        
        return jwtUtils.getEmailFromToken(token);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Resume>> createResume(HttpServletRequest request, @RequestBody ResumeDTO resumeDTO) {
        try {
            String email = getEmailFromRequest(request);
            Resume resume = resumeService.createResume(email, resumeDTO);
            return ResponseEntity.ok(ApiResponse.success(resume, "Resume created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/update/{resumeId}")
    public ResponseEntity<ApiResponse<Resume>> updateResume(HttpServletRequest request, 
                                                            @PathVariable Long resumeId, 
                                                            @RequestBody ResumeDTO resumeDTO) {
        try {
            String email = getEmailFromRequest(request);
            Resume resume = resumeService.updateResume(email, resumeId, resumeDTO);
            return ResponseEntity.ok(ApiResponse.success(resume, "Resume updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/get/{resumeId}")
    public ResponseEntity<ApiResponse<Resume>> getResume(HttpServletRequest request, @PathVariable Long resumeId) {
        try {
            String email = getEmailFromRequest(request);
            Resume resume = resumeService.getResume(email, resumeId);
            return ResponseEntity.ok(ApiResponse.success(resume, "Resume fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<Resume>>> getAllResumes(HttpServletRequest request) {
        try {
            String email = getEmailFromRequest(request);
            List<Resume> resumes = resumeService.getAllResumes(email);
            return ResponseEntity.ok(ApiResponse.success(resumes, "Resumes fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{resumeId}")
    public ResponseEntity<ApiResponse<Void>> deleteResume(HttpServletRequest request, @PathVariable Long resumeId) {
        try {
            String email = getEmailFromRequest(request);
            resumeService.deleteResume(email, resumeId);
            return ResponseEntity.ok(ApiResponse.success(null, "Resume deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/templates")
    public ResponseEntity<ApiResponse<List<ResumeTemplate>>> getAllTemplates() {
        try {
            List<ResumeTemplate> templates = resumeService.getAllTemplates();
            return ResponseEntity.ok(ApiResponse.success(templates, "Templates fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/templates/{templateId}")
    public ResponseEntity<ApiResponse<ResumeTemplate>> getTemplate(@PathVariable Long templateId) {
        try {
            ResumeTemplate template = resumeService.getTemplate(templateId);
            return ResponseEntity.ok(ApiResponse.success(template, "Template fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}