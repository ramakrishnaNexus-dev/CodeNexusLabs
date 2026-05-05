import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message = 'Something went wrong', onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="bg-red-50 rounded-full p-3 mb-4">
      <AlertCircle className="w-8 h-8 text-red-500" />
    </div>
    <p className="text-gray-700 font-medium text-center mb-4">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">
        <RefreshCw className="w-4 h-4" /> Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;