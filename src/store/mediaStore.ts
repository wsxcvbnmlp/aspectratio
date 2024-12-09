import { create } from 'zustand';

export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
  output?: Blob;
}

interface MediaStore {
  files: MediaFile[];
  paddingColor: string | null;
  tempColor: string;
  addFiles: (newFiles: File[]) => void;
  updateFile: (id: string, updates: Partial<MediaFile>) => void;
  removeFile: (id: string) => void;
  setTempColor: (color: string) => void;
  applyColor: () => void;
  clearFiles: () => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  files: [],
  paddingColor: null,
  tempColor: '#000000',
  addFiles: (newFiles) =>
    set((state) => ({
      files: [
        ...state.files,
        ...newFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          preview: '',
          status: 'pending',
          progress: 0,
        })),
      ],
    })),
  updateFile: (id, updates) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, ...updates } : file
      ),
    })),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  setTempColor: (color) => set({ tempColor: color }),
  applyColor: () => set((state) => ({ paddingColor: state.tempColor })),
  clearFiles: () => set({ files: [] }),
}));