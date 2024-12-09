import JSZip from 'jszip';
import { MediaFile } from '../store/mediaStore';

interface DownloadOptions {
  createSubfolders?: boolean;
}

export class DownloadManager {
  private zip: JSZip;

  constructor() {
    this.zip = new JSZip();
  }

  private getSubfolderName(file: File): string {
    if (file.type.startsWith('image/')) return 'images';
    if (file.type.startsWith('video/')) return 'videos';
    return 'other';
  }

  private async verifyFile(file: Blob): Promise<boolean> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      return arrayBuffer.byteLength > 0;
    } catch (error) {
      console.error('File verification failed:', error);
      return false;
    }
  }

  async addFile(mediaFile: MediaFile, options: DownloadOptions = {}): Promise<boolean> {
    const { file, output } = mediaFile;
    const fileToAdd = output || file;
    
    if (!(await this.verifyFile(fileToAdd))) {
      return false;
    }

    const path = options.createSubfolders
      ? `${this.getSubfolderName(file)}/${file.name}`
      : file.name;

    this.zip.file(path, fileToAdd);
    return true;
  }

  async downloadAll(filename: string = 'media'): Promise<void> {
    const blob = await this.zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  }
}