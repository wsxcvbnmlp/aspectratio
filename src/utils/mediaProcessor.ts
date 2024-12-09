export async function processImage(
  file: File,
  backgroundColor: string | null
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    img.onload = () => {
      const size = Math.max(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      if (backgroundColor) {
        // Fill background if color is provided
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);
      }

      // Center image
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;
      ctx.drawImage(img, x, y);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to convert image'));
      }, file.type);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export async function processVideo(
  file: File,
  backgroundColor: string | null,
  onProgress: (progress: number) => void
): Promise<Blob> {
  // Video processing implementation will be added here
  // This is a placeholder that returns the original file
  return file;
}