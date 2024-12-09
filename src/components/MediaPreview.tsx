import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { MediaFile } from '../store/mediaStore';

interface Props {
  file: MediaFile;
  onRemove: () => void;
  backgroundColor: string | null;
}

export function MediaPreview({ file, onRemove, backgroundColor }: Props) {
  useEffect(() => {
    if (file.file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const size = Math.max(img.width, img.height);
        
        canvas.width = size;
        canvas.height = size;
        
        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, size, size);
        }
        
        const x = (size - img.width) / 2;
        const y = (size - img.height) / 2;
        ctx.drawImage(img, x, y);
        
        const preview = canvas.toDataURL(file.file.type);
        URL.revokeObjectURL(file.preview);
        file.preview = preview;
      };
      img.src = URL.createObjectURL(file.file);
    }
  }, [file, backgroundColor]);

  return (
    <div className="relative group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {file.preview ? (
          file.file.type.startsWith('image/') ? (
            <div className={backgroundColor ? '' : 'bg-[url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAADFJREFUOI1j/P///38GKgAmaobBYDAYjQYjNAwYGBgYGEkxgBxNowZQIRqpnpkGQzQCADRYBAuStVV/AAAAAElFTkSuQmCC")]'}>
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <video
              src={file.preview}
              className="w-full h-full object-contain"
              controls
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full" />
          </div>
        )}
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="mt-2">
        <div className="h-1 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${file.progress}%` }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500 truncate">{file.file.name}</p>
      </div>
    </div>
  );
}