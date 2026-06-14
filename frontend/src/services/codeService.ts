// frontend/src/services/codeService.ts

// Get API base URL from environment variable (set in .env or Render)
// For local: VITE_API_URL=http://localhost:8080/api/v1
// For Render: VITE_API_URL=https://codenexuslabs.onrender.com/api/v1
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Fallback for safety (should not be needed if env is properly set)
if (!API_BASE_URL) {
  console.warn('VITE_API_URL is not set. Using default for production.');
}

export interface CodeExecutionRequest {
  code: string;
  language: string;
  stdin?: string;
}

export interface CodeExecutionResponse {
  success: boolean;
  output: string;
  error: string;
  message: string;
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  version: string;
}

/**
 * Execute code using the backend API
 * @param code - Source code to execute
 * @param language - Programming language (java, python, javascript, sql)
 * @param stdin - Optional standard input for the program
 * @returns Execution result with output or error
 */
export const executeCode = async (
  code: string,
  language: string,
  stdin: string = ''
): Promise<CodeExecutionResponse> => {
  // Validate inputs
  if (!code || code.trim().length === 0) {
    return {
      success: false,
      output: '',
      error: 'No code provided',
      message: 'Please write some code before running',
    };
  }

  if (!API_BASE_URL) {
    return {
      success: false,
      output: '',
      error: 'API URL not configured',
      message: 'Environment variable VITE_API_URL is not set',
    };
  }

  try {
    // Note: API_BASE_URL already includes /api/v1, so don't add it again
    const response = await fetch(`${API_BASE_URL}/code/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        code: code,
        language: language.toLowerCase(),
        stdin: stdin,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        output: '',
        error: `HTTP ${response.status}: ${errorText}`,
        message: `Server returned error ${response.status}`,
      };
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Code execution error:', error);
    return {
      success: false,
      output: '',
      error: error.message || 'Network error',
      message: 'Failed to connect to code execution server. Please check if backend is running.',
    };
  }
};

/**
 * Get list of supported languages
 * @returns Array of language objects
 */
export const getSupportedLanguages = async (): Promise<Language[]> => {
  if (!API_BASE_URL) {
    return getDefaultLanguages();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/code/languages`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return getDefaultLanguages();
    }

    const languageIds = await response.json();
    
    // Map language IDs to full language objects
    return languageIds.map((id: string) => {
      switch (id) {
        case 'java':
          return { id: 'java', name: 'Java', icon: '☕', version: '17' };
        case 'python':
          return { id: 'python', name: 'Python', icon: '🐍', version: '3.10' };
        case 'javascript':
          return { id: 'javascript', name: 'JavaScript', icon: '📜', version: 'ES2020' };
        case 'sql':
          return { id: 'sql', name: 'SQL', icon: '🗄️', version: 'SQLite3' };
        default:
          return { id: id, name: id, icon: '💻', version: 'latest' };
      }
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    return getDefaultLanguages();
  }
};

/**
 * Default languages (fallback if API fails)
 */
const getDefaultLanguages = (): Language[] => {
  return [
    { id: 'java', name: 'Java', icon: '☕', version: '17' },
    { id: 'python', name: 'Python', icon: '🐍', version: '3.10' },
    { id: 'javascript', name: 'JavaScript', icon: '📜', version: 'ES2020' },
    { id: 'sql', name: 'SQL', icon: '🗄️', version: 'SQLite3' },
  ];
};

/**
 * Check if backend code execution API is healthy
 */
export const isCodeApiHealthy = async (): Promise<boolean> => {
  if (!API_BASE_URL) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/code/languages`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
};