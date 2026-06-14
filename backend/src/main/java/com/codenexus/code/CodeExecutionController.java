package com.codenexus.code;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/code")
@CrossOrigin(origins = "*")
public class CodeExecutionController {

    private final CodeExecutionService executionService;

    public CodeExecutionController(CodeExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping("/execute")
    public ResponseEntity<CodeExecutionResponse> executeCode(@RequestBody CodeExecutionRequest request) {
        System.out.println("📨 Received code execution request for: " + request.getLanguage());
        
        CodeExecutionResponse response = executionService.executeCode(
            request.getCode(),
            request.getLanguage(),
            request.getStdin()
        );
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/languages")
    public ResponseEntity<String[]> getSupportedLanguages() {
        return ResponseEntity.ok(new String[]{"java", "python", "javascript", "sql"});
    }
}