import React, { createContext, useContext } from 'react';

export interface MediaImage {
  id: string;
  name: string;
  url: string;
  dimensions?: string;
}

const MediaContext = createContext<MediaImage[]>([]);

export function MediaProvider({ images, children }: { images: MediaImage[]; children: React.ReactNode }) {
  return <MediaContext.Provider value={images}>{children}</MediaContext.Provider>;
}

export function useMediaImages(): MediaImage[] {
  return useContext(MediaContext);
}
