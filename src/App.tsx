import { RouterProvider } from 'react-router';

import '@/styles/App.css';
import router from '@/router';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
