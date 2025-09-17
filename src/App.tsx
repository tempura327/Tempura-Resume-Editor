import { RouterProvider } from 'react-router';
import { HeroUIProvider } from '@heroui/react';

import '@/styles/App.css';
import router from '@/router';

function App() {
  return (
    <div>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </div>
  );
}

export default App;
