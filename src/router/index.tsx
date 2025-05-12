import { createBrowserRouter } from 'react-router';

import Workbench from '@/pages/Workbench';

const routes = [
  {
    path: '/',
    // TODO:
    // element: <Layout routes={appbarList} />,
    children: [
      {
        path: '/workbench',
        element: <Workbench />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
