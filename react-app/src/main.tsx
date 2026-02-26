import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { registry } from './registry';
import './styles/admin.css';

declare global {
  interface Window {
    __REACT_RENDER__: (name: string, props: Record<string, unknown>, containerId: string) => void;
  }
}

window.__REACT_RENDER__ = (name: string, props: Record<string, unknown>, containerId: string) => {
  const Component = registry[name];
  if (!Component) {
    console.error(`[TypeForge React] Unknown component: "${name}"`);
    return;
  }
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[TypeForge React] Container not found: "#${containerId}"`);
    return;
  }
  createRoot(container).render(
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );
};
