import { useCallback } from 'react';
import { MediaFile, useMediaStore } from '../store/mediaStore';
import { DownloadManager } from '../utils/downloadManager';
import { DownloadQueue } from '../utils/downloadQueue';

export function useDownloadHandler() {
  const { files, updateFile } = useMediaStore();
  const downloadQueue = new DownloadQueue();
  
  const processDownloads = useCallback(async (
    createSubfolders: boolean = true
  ) => {
    const downloadManager = new DownloadManager();
    
    for (const file of files) {
      downloadQueue.enqueue(file);
    }

    while (!downloadQueue.isEmpty()) {
      const file = downloadQueue.dequeue();
      if (!file) continue;

      try {
        updateFile(file.id, { status: 'processing', progress: 0 });
        
        const success = await downloadManager.addFile(file, { 
          createSubfolders 
        });

        if (success) {
          updateFile(file.id, { 
            status: 'complete', 
            progress: 100 
          });
        } else {
          updateFile(file.id, { 
            status: 'error', 
            progress: 0 
          });
        }
      } catch (error) {
        console.error(`Error processing ${file.file.name}:`, error);
        updateFile(file.id, { 
          status: 'error', 
          progress: 0 
        });
      }
    }

    await downloadManager.downloadAll();
  }, [files, updateFile]);

  return { processDownloads };
}