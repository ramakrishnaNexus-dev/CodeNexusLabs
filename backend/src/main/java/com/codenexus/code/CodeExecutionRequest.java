package com.codenexus.code;

public class CodeExecutionRequest {
    private String code;
    private String language;
    private String stdin;

    // Constructors
    public CodeExecutionRequest() {}

    public CodeExecutionRequest(String code, String language, String stdin) {
        this.code = code;
        this.language = language;
        this.stdin = stdin;
    }

    // Getters and Setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getStdin() { return stdin; }
    public void setStdin(String stdin) { this.stdin = stdin; }
}