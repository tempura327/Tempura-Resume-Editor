import { RouterProvider } from 'react-router';

import '@/styles/App.css';
import router from '@/router';

function App() {
  return (
    <main className="w-2/3 py-8 mx-auto">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
