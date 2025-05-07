import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }
  
  export const Input: React.FC<InputProps> = ({ 
    label, 
    error, 
    className = '',
    ...props 
  }) => {
    return (
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <input
          className={`w-full p-2 bg-gray-200 rounded ${error ? 'border border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };