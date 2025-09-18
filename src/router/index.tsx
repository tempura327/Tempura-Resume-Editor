import { createBrowserRouter } from 'react-router';

import Workbench from '@/pages/Workbench';
import SelectTheme from '@/pages/SelectTheme';

const routes = [
  {
    path: '/',
    // TODO:
    // element: <Layout routes={appbarList} />,
    children: [
      {
        path: '',
        element: <SelectTheme />,
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
