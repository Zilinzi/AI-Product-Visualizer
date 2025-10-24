
import React from 'react';

interface ImageGalleryProps {
  generatedImages: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ generatedImages }) => {
  if (generatedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold">Your generated image will appear here</h3>
        <p className="mt-2 max-w-md">Upload your product image and choose a visualization option to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {generatedImages.map((src, index) => (
        <div key={index} className="bg-gray-900 p-2 rounded-lg shadow-lg animate-fade-in">
          <img
            src={src}
            alt={`Generated visualization ${index + 1}`}
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      ))}
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
    </div>
  );
};
