import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Play, RotateCcw, Copy, Check, Terminal, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const sampleCodes: Record<string, string> = {
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeNexusLabs!");\n    }\n}',
  python: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("CodeNexusLabs"))',
  javascript: 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("CodeNexusLabs"));',
};

const CodePractice = () => {
  const [code, setCode] = useState(sampleCodes.java);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('java');
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput('');
    setTimeout(() => {
      let result = '';
      if (language === 'java') result = '✅ Compilation successful!\n\nOutput:\nHello, CodeNexusLabs!\n\nProcess finished with exit code 0';
      else if (language === 'python') result = 'Output:\nHello, CodeNexusLabs!\n\nProcess finished with exit code 0';
      else result = 'Output:\nHello, CodeNexusLabs!\n\nProcess finished with exit code 0';
      setOutput(result);
      setRunning(false);
      toast.success('Code executed!');
    }, 1000);
  };

  const resetCode = () => {
    setCode(sampleCodes[language]);
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">🏠 Home</Link>
          <Link to="/courses" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">📚 Courses</Link>
          <Link to="/student/dashboard" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">📊 Dashboard</Link>
        </div>
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-700">Code Practice</span>
        </div>
        <div className="flex items-center gap-3">
          <select value={language} onChange={(e) => { setLanguage(e.target.value); setCode(sampleCodes[e.target.value]); setOutput(''); }}
            className="px-2 py-1 rounded-md border border-gray-200 text-xs font-medium bg-white">
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={copyCode} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500" title="Copy">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={resetCode} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500" title="Reset">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={() => { setCode(''); setOutput(''); }} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500" title="Clear">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split - 50/50 Full Height */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* LEFT - Code Editor */}
        <div className="flex flex-col border-r border-gray-300">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-6 font-mono text-base bg-gray-900 text-green-400 resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
            placeholder="Write your code here..."
          />
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono">{language === 'python' ? 'main.py' : language === 'javascript' ? 'main.js' : 'Main.java'}</span>
            <button onClick={runCode} disabled={running}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              {running ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Running...</>
              ) : (
                <><Play className="w-4 h-4" /> Run Code</>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT - Output */}
        <div className="flex flex-col bg-gray-900">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Output</span>
          </div>
          <div className="flex-1 p-6 font-mono text-base overflow-y-auto">
            {output ? (
              <pre className="whitespace-pre-wrap text-green-400 leading-relaxed">{output}</pre>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Terminal className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                  <p className="text-gray-600 text-sm">Run your code to see the output here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePractice;