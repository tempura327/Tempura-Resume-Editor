import { createBrowserRouter } from 'react-router';

import SelectLayout from '@/pages/SelectLayout';
import Workbench from '@/pages/Workbench';

const routes = [
  {
    path: '/',
    // TODO:
    // element: <Layout routes={appbarList} />,
    children: [
      {
        path: '/',
        element: <SelectLayout />,
      },
      {
        path: '/workbench',
        element: <Workbench />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
