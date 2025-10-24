
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ImageGallery } from './components/ImageGallery';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { generateMarketingImage } from './services/geminiService';
import type { UploadedImage } from './types';

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setUploadedImage({
        base64: base64String,
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file),
      });
      setGeneratedImages([]);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitPrompt = useCallback(async (prompt: string) => {
    if (!uploadedImage) {
      setError('Please upload a product image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const fullPrompt = `Place the product from the image onto ${prompt}. Maintain product consistency.`;
      const resultImage = await generateMarketingImage(uploadedImage.base64, uploadedImage.mimeType, fullPrompt);
      if (resultImage) {
        setGeneratedImages([resultImage]);
      } else {
        setError('The AI could not generate an image. Please try a different prompt.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-gray-800 rounded-xl shadow-2xl p-6 flex flex-col gap-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/20 pb-2">1. Upload Product</h2>
            <ImageUploader onImageUpload={handleImageUpload} imagePreviewUrl={uploadedImage?.previewUrl} />
            
            <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/20 pb-2 mt-4">2. Visualize</h2>
            <PromptControls onSubmit={handleSubmitPrompt} isDisabled={isLoading || !uploadedImage} />
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8 bg-gray-800/50 rounded-xl shadow-2xl p-6 min-h-[60vh]">
             <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/20 pb-2 mb-6">3. Result</h2>
            {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg text-center">{error}</div>}
            
            {isLoading ? (
              <Loader />
            ) : (
              <ImageGallery generatedImages={generatedImages} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
