// src/pages/student/CodePractice.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Play, RotateCcw, Copy, Check, Terminal, Trash2, 
  AlertCircle, Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { executeCode } from '../../services/codeService';

// Sample code for each language (working examples)
const sampleCodes: Record<string, string> = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeNexusLabs!");
        System.out.println("Welcome to Java Programming!");
    }
}`,
  python: `def greet(name):
    return f"Hello, {name}!"

def main():
    print("Hello, CodeNexusLabs!")
    print("Welcome to Python Programming!")
    name = input("Enter your name: ")
    print(greet(name))

if __name__ == "__main__":
    main()`,
  javascript: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log("Hello, CodeNexusLabs!");
console.log("Welcome to JavaScript!");
console.log(greet("Student"));`,
  sql: `-- SQLite Example
SELECT 'Hello, CodeNexusLabs!' as message
UNION ALL
SELECT 'Welcome to SQL!' as message;`
};

// Language configuration
const languages = [
  { id: 'java', name: 'Java', icon: '☕', color: 'text-red-500' },
  { id: 'python', name: 'Python', icon: '🐍', color: 'text-blue-500' },
  { id: 'javascript', name: 'JavaScript', icon: '📜', color: 'text-yellow-500' },
  { id: 'sql', name: 'SQL', icon: '🗄️', color: 'text-green-500' },
];

const CodePractice = () => {
  const [code, setCode] = useState(sampleCodes.java);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('java');
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [fullOutput, setFullOutput] = useState('');

  // Handle language change
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(sampleCodes[newLang]);
    setOutput('');
    setFullOutput('');
  };

  // Run code execution
  const runCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    setRunning(true);
    setOutput('⏳ Connecting to compiler...');

    try {
      const result = await executeCode(code, language, userInput);
      
      if (result.success) {
        const outputText = result.output || '✅ Execution successful!\n\n(No output printed)';
        setOutput(outputText);
        setFullOutput(outputText);
        toast.success('Code executed successfully!');
      } else {
        const errorText = result.error || result.message || 'Unknown error';
        setOutput(`❌ Error:\n${errorText}`);
        setFullOutput(`❌ Error:\n${errorText}`);
        toast.error('Execution failed!');
      }
    } catch (error: any) {
      setOutput(`❌ Network Error: ${error.message}\n\nPlease check your connection.`);
      setFullOutput(`❌ Network Error: ${error.message}`);
      toast.error('Failed to connect to compiler service');
    } finally {
      setRunning(false);
    }
  };

  // Reset code to sample
  const resetCode = () => {
    setCode(sampleCodes[language]);
    setOutput('');
    setFullOutput('');
    setUserInput('');
    toast.success('Code reset to sample');
  };

  // Clear all
  const clearAll = () => {
    setCode('');
    setOutput('');
    setFullOutput('');
    setUserInput('');
    toast.success('Cleared');
  };

  // Copy code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  // Copy output
  const copyOutput = async () => {
    if (!fullOutput) {
      toast.error('Nothing to copy');
      return;
    }
    try {
      await navigator.clipboard.writeText(fullOutput);
      toast.success('Output copied!');
    } catch {
      toast.error('Failed to copy output');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium">
            🏠 Home
          </Link>
          <Link to="/courses" className="text-gray-300 hover:text-white text-sm font-medium">
            📚 Courses
          </Link>
          <Link to="/student/dashboard" className="text-gray-300 hover:text-white text-sm font-medium">
            📊 Dashboard
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-semibold">Code Practice</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-600 bg-gray-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.icon} {lang.name}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <button
            onClick={copyCode}
            className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button
            onClick={resetCode}
            className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Reset to sample"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={clearAll}
            className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Input Toggle */}
          <button
            onClick={() => setShowInput(!showInput)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showInput 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Terminal className="w-4 h-4 inline mr-1" />
            Input
          </button>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL - Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-700">
          {/* Editor Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-400 font-mono">
                {language === 'java' ? 'Main.java' : 
                 language === 'python' ? 'main.py' : 
                 language === 'javascript' ? 'script.js' : 'query.sql'}
              </span>
            </div>
            <button
              onClick={runCode}
              disabled={running}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Code
                </>
              )}
            </button>
          </div>

          {/* Code Editor Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-5 font-mono text-sm bg-gray-900 text-gray-200 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
            style={{ tabSize: 4 }}
            placeholder="// Write your code here..."
          />
        </div>

        {/* RIGHT PANEL - Output */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Output Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Output</span>
            </div>
            {fullOutput && (
              <button
                onClick={copyOutput}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Copy output
              </button>
            )}
          </div>

          {/* Output Display */}
          <div className="flex-1 p-5 overflow-y-auto">
            {!output && (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <Terminal className="w-12 h-12 mb-3" />
                <p className="text-sm">Run your code to see the output here</p>
              </div>
            )}
            {output && (
              <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-words">
                {output}
              </pre>
            )}
          </div>

          {/* Input Section (Conditional) */}
          {showInput && (
            <div className="border-t border-gray-700 bg-gray-800">
              <div className="px-4 py-2 border-b border-gray-700">
                <span className="text-xs font-medium text-gray-400">Standard Input (stdin)</span>
              </div>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter input for your program (e.g., name, numbers)..."
                className="w-full p-3 bg-gray-800 text-gray-300 font-mono text-sm resize-none focus:outline-none"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 px-4 py-1 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Language: {languages.find(l => l.id === language)?.name || language}</span>
          <span>•</span>
          <span>Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3 h-3" />
          <span>Powered by Piston API</span>
        </div>
      </div>
    </div>
  );
};

export default CodePractice;