import React from 'react';

interface CodeOutputProps {
  output: string;
  error?: string;
  loading?: boolean;
  height?: string;
  className?: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  output,
  error,
  loading = false,
  height = '150px',
  className = '',
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
        <span className="font-mono text-sm">Output</span>
        {loading && (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span className="text-xs">Running...</span>
          </div>
        )}
      </div>
      <div
        className={`bg-gray-800 text-white font-mono text-sm p-4 overflow-auto ${
          error ? 'text-red-400' : 'text-green-400'
        }`}
        style={{ height, whiteSpace: 'pre-wrap' }}
      >
        {loading ? (
          <span className="text-gray-400">Executing code...</span>
        ) : error ? (
          error
        ) : output ? (
          output
        ) : (
          <span className="text-gray-400">Code output will appear here...</span>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;