import React, { useCallback } from 'react';
import { Download } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { ColorPicker } from './components/ColorPicker';
import { MediaPreview } from './components/MediaPreview';
import { useMediaStore } from './store/mediaStore';
import { useDownloadHandler } from './hooks/useDownloadHandler';

export default function App() {
  const { files, removeFile, clearFiles, paddingColor } = useMediaStore();
  const { processDownloads } = useDownloadHandler();

  const handleDownload = useCallback(async () => {
    await processDownloads(true);
  }, [processDownloads]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Square Media Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert your photos and videos to 1:1 aspect ratio with custom padding
          </p>
        </div>

        <div className="space-y-8">
          {files.length === 0 ? (
            <DropZone />
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <ColorPicker />
                  <div className="flex gap-4">
                    <button
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Add More Files
                    </button>
                    <button
                      onClick={clearFiles}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files.map((file) => (
                  <MediaPreview
                    key={file.id}
                    file={file}
                    onRemove={() => removeFile(file.id)}
                    backgroundColor={paddingColor}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}