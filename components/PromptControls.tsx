
import React, { useState } from 'react';

interface PromptControlsProps {
  onSubmit: (prompt: string) => void;
  isDisabled: boolean;
}

const presetPrompts = [
  { label: 'On a T-Shirt', prompt: 'a person wearing a t-shirt with the product on it, studio lighting', icon: '👕' },
  { label: 'On a Billboard', prompt: 'a billboard in a busy city square like Times Square', icon: '🏙️' },
  { label: 'On a Coffee Mug', prompt: 'a ceramic coffee mug on a wooden table', icon: '☕' },
  { label: 'As a Sticker', prompt: 'a vinyl sticker with a peel-off edge', icon: '✨' },
];

export const PromptControls: React.FC<PromptControlsProps> = ({ onSubmit, isDisabled }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handlePresetClick = (prompt: string) => {
    onSubmit(prompt);
  };
  
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      onSubmit(customPrompt);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {presetPrompts.map(({ label, prompt, icon }) => (
          <button
            key={label}
            onClick={() => handlePresetClick(prompt)}
            disabled={isDisabled}
            className="flex flex-col items-center justify-center p-3 bg-gray-700 rounded-lg text-sm text-gray-200 hover:bg-cyan-500 hover:text-white disabled:bg-gray-700/50 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span className="text-2xl mb-1">{icon}</span>
            {label}
          </button>
        ))}
      </div>
       <div className="relative flex items-center mt-2">
            <div className="absolute inset-y-0 left-0 w-10 flex items-center justify-center pointer-events-none text-gray-500">or</div>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

      <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2 mt-2">
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Or describe a custom scene..."
          disabled={isDisabled}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition resize-none disabled:bg-gray-700/50 disabled:text-gray-500"
          rows={3}
        />
        <button
          type="submit"
          disabled={isDisabled || !customPrompt.trim()}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Generate Custom
        </button>
      </form>
    </div>
  );
};
