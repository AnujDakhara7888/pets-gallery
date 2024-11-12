import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImageContextType {
  selectedImages: string[];
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imageId => imageId !== id)
        : [...prev, id]
    );
  };

  const selectAll = (ids: string[]) => {
    setSelectedImages(ids);
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };

  return (
    <ImageContext.Provider value={{ 
      selectedImages, 
      toggleSelection, 
      selectAll, 
      clearSelection 
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};