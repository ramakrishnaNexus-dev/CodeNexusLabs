package com.codenexus.code;

public class CodeExecutionResponse {
    private boolean success;
    private String output;
    private String error;
    private String message;

    public CodeExecutionResponse() {}

    public CodeExecutionResponse(boolean success, String output, String error, String message) {
        this.success = success;
        this.output = output;
        this.error = error;
        this.message = message;
    }

    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    // Static factory methods
    public static CodeExecutionResponse success(String output) {
        return new CodeExecutionResponse(true, output, null, "Execution successful");
    }

    public static CodeExecutionResponse error(String error, String message) {
        return new CodeExecutionResponse(false, null, error, message);
    }
}