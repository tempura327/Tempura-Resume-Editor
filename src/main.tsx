import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { HeroUIProvider } from '@heroui/react';

import '@/styles/App.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </HeroUIProvider>
  </StrictMode>,
);
