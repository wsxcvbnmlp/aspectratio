import { MediaFile } from '../store/mediaStore';

export class DownloadQueue {
  private queue: MediaFile[] = [];
  private processing = false;

  enqueue(file: MediaFile): void {
    this.queue.push(file);
  }

  dequeue(): MediaFile | undefined {
    return this.queue.shift();
  }

  clear(): void {
    this.queue = [];
    this.processing = false;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  isProcessing(): boolean {
    return this.processing;
  }

  setProcessing(value: boolean): void {
    this.processing = value;
  }
}