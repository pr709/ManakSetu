import { useState, useRef, type DragEvent } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect?: (fileName: string) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file.name);
      onFileSelect?.(file.name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      onFileSelect?.(file.name);
    }
  };

  return (
    <div>
      {!selectedFile ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UploadCloud className="h-7 w-7" />
          </div>
          <p className="mt-3 text-sm font-medium text-navy-900">Drop your tender document here</p>
          <p className="mt-1 text-xs text-slate-500">or click to browse</p>
          <p className="mt-2 text-xs text-slate-400">PDF • DOCX • TXT</p>
          <input ref={inputRef} type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileInput} />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-navy-900">{selectedFile}</p>
            <p className="text-xs text-slate-500">File ready for analysis</p>
          </div>
          <button
            onClick={() => { setSelectedFile(null); if (inputRef.current) inputRef.current.value = ''; }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
