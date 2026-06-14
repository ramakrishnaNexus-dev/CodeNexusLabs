package com.codenexus.code;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
public class CodeExecutionService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    private static final Map<String, String> LANGUAGE_MAP = Map.of(
        "java", "java",
        "python", "python3",
        "javascript", "nodejs",
        "sql", "sqlite3"
    );

    // Your actual JDoodle credentials
    private static final String JDODDLE_CLIENT_ID = "5790d311dc30152d97e6ccf47a7eabfa";
    private static final String JDODDLE_CLIENT_SECRET = "ca57ec12c686f277e1152f281e48454e47e6e0fa68b9910cec0f5249595e9f98";

    public CodeExecutionService() {
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();
        this.objectMapper = new ObjectMapper();
        System.out.println("✅ CodeExecutionService initialized with JDoodle API");
    }

    public CodeExecutionResponse executeCode(String sourceCode, String language, String stdin) {
        // Validate input
        if (sourceCode == null || sourceCode.trim().isEmpty()) {
            return CodeExecutionResponse.error("No code provided", "Please write some code first");
        }

        String lang = LANGUAGE_MAP.get(language.toLowerCase());
        if (lang == null) {
            return CodeExecutionResponse.error("Unsupported language: " + language,
                "Supported languages: Java, Python, JavaScript, SQL");
        }

        try {
            // Build request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("clientId", JDODDLE_CLIENT_ID);
            requestBody.put("clientSecret", JDODDLE_CLIENT_SECRET);
            requestBody.put("script", sourceCode);
            requestBody.put("stdin", (stdin != null && !stdin.isEmpty()) ? stdin : "");
            requestBody.put("language", lang);
            requestBody.put("versionIndex", "0");

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            
            System.out.println("📤 Executing " + language + " code...");
            System.out.println("📝 Code:\n" + sourceCode);
            
            // Send request to JDoodle
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.jdoodle.com/v1/execute"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .timeout(Duration.ofSeconds(20))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            System.out.println("📥 Response status: " + response.statusCode());
            
            JsonNode jsonResponse = objectMapper.readTree(response.body());

            if (response.statusCode() == 200) {
                if (jsonResponse.has("output")) {
                    String output = jsonResponse.get("output").asText();
                    String error = jsonResponse.has("error") ? jsonResponse.get("error").asText() : "";
                    
                    if (error != null && !error.isEmpty() && !error.equals("null")) {
                        return CodeExecutionResponse.error(error, "Compilation or runtime error");
                    }
                    
                    String finalOutput = output.isEmpty() ? 
                        "✅ Code executed successfully!\n\n(No output produced)" : output;
                    return CodeExecutionResponse.success(finalOutput);
                } else {
                    String errorMsg = jsonResponse.has("error") ? 
                        jsonResponse.get("error").asText() : "Unknown error";
                    return CodeExecutionResponse.error(errorMsg, "Execution failed");
                }
            } else {
                String errorMsg = jsonResponse.has("error") ? 
                    jsonResponse.get("error").asText() : "JDoodle API error";
                return CodeExecutionResponse.error(errorMsg, "API returned status: " + response.statusCode());
            }

        } catch (Exception e) {
            System.err.println("❌ JDoodle error: " + e.getMessage());
            return CodeExecutionResponse.error(
                e.getMessage(), 
                "Failed to execute code. Please try again."
            );
        }
    }
}