import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';

export function DropZone() {
  const { addFiles } = useMediaStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
  }, [addFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} id="fileInput" />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg font-medium text-gray-900">
        Drop files here or click to upload
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Support for images and videos
      </p>
    </div>
  );
}