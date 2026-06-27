import { useState } from 'react';
import { adminAPI } from '../../services/api';
import { 
  Download, Upload, FileSpreadsheet, Database, Shield, 
  CheckCircle2, AlertCircle, Loader2, RefreshCw,
  FileText, Users, BookOpen, HardDrive
} from 'lucide-react';
import toast from 'react-hot-toast';

const BackupManagement = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{ count: number; message: string } | null>(null);

  // ===== EXPORT COURSES =====
  const handleExportCourses = async () => {
    setIsExporting(true);
    try {
      const response = await adminAPI.exportCourses();
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `courses-backup-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Courses exported successfully!');
    } catch (error: any) {
      console.error('Export error:', error);
      toast.error(error?.message || 'Failed to export courses');
    } finally {
      setIsExporting(false);
    }
  };

  // ===== IMPORT COURSES =====
  const handleImportCourses = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    setIsImporting(true);
    setImportResult(null);
    
    try {
      const response = await adminAPI.importCourses(selectedFile);
      const data = response as any;
      
      setImportResult({
        count: data?.data || 0,
        message: data?.message || 'Courses imported successfully'
      });
      
      toast.success(data?.message || 'Courses imported successfully!');
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error(error?.response?.data?.message || 'Failed to import courses');
      setImportResult({
        count: 0,
        message: 'Import failed. Please check the file format.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  // ===== HANDLE FILE SELECTION =====
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setImportResult(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-indigo-600" />
            Data Backup &amp; Restore
          </h1>
          <p className="text-gray-500 mt-1">
            Export your data to Excel or restore from a backup file
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Secure backup</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Courses</p>
            <p className="text-xl font-bold text-gray-900">Backup as Excel</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Restore</p>
            <p className="text-xl font-bold text-gray-900">From Excel</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Safety</p>
            <p className="text-xl font-bold text-gray-900">Data Protected</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== EXPORT SECTION ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Export to Excel</h2>
              <p className="text-sm text-gray-500">Download all courses as Excel file</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">What you'll get:</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• All course data (ID, Title, Description, Category)</li>
                    <li>• Difficulty, Duration, Instructor details</li>
                    <li>• Students count and ratings</li>
                    <li>• Active status</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleExportCourses}
              disabled={isExporting}
              className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Courses Excel
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===== IMPORT SECTION ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Import from Excel</h2>
              <p className="text-sm text-gray-500">Restore courses from backup file</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Instructions:</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Upload a valid Excel file (.xlsx or .xls)</li>
                    <li>• File must follow the export format</li>
                    <li>• Existing courses will be preserved</li>
                    <li>• Duplicate entries will be handled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* File Input */}
            <div className="relative">
              <input
                id="fileInput"
                type="file"
                accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  selectedFile 
                    ? 'border-emerald-400 bg-emerald-50' 
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30'
                }`}
              >
                {selectedFile ? (
                  <>
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">{selectedFile.name}</span>
                    <span className="text-xs text-gray-400">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Click to choose Excel file</span>
                  </>
                )}
              </label>
            </div>

            <button
              onClick={handleImportCourses}
              disabled={isImporting || !selectedFile}
              className={`w-full py-3 text-base rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                isImporting || !selectedFile
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Restore Courses
                </>
              )}
            </button>

            {/* Import Result */}
            {importResult && (
              <div className={`p-4 rounded-xl border ${
                importResult.count > 0 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  {importResult.count > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${
                      importResult.count > 0 ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {importResult.count > 0 
                        ? `✅ ${importResult.count} courses imported successfully`
                        : '❌ Import failed'}
                    </p>
                    <p className="text-sm text-gray-600">{importResult.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Box at Bottom */}
      <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <RefreshCw className="w-4 h-4 text-gray-400" />
          <span>Backup files are stored locally. Keep them safe for disaster recovery.</span>
        </div>
      </div>
    </div>
  );
};

export default BackupManagement;