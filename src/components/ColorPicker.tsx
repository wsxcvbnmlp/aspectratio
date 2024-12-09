import React from 'react';
import { useMediaStore } from '../store/mediaStore';
import { Palette, Eye } from 'lucide-react';

export function ColorPicker() {
  const { tempColor, setTempColor, applyColor } = useMediaStore();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-gray-500" />
        <label htmlFor="color" className="text-sm font-medium text-gray-700">
          Choose padding color:
        </label>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="color"
            id="color"
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <div 
            className="absolute inset-0 rounded border border-gray-200 pointer-events-none"
            style={{ backgroundColor: tempColor }}
          />
        </div>
        <button
          onClick={applyColor}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>
    </div>
  );
}