package com.codenexus.common;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";
    private static final String BASE_URL = "https://codenexuslabs-production.up.railway.app";

    @PostMapping("/image")
    public ApiResponse<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            Map<String, String> result = new LinkedHashMap<>();
            result.put("url", BASE_URL + "/uploads/" + fileName);
            return ApiResponse.success(result, "Image uploaded");
        } catch (Exception e) {
            return ApiResponse.error("Upload failed: " + e.getMessage());
        }
    }
}