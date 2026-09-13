import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'buy-online',
        element: <PlaceholderPage title="Buy Online Subscription" />,
      },
      {
        path: 'more-services',
        element: <PlaceholderPage title="Additional Services & Activation" />,
      },
      {
        path: 'gen-assist',
        element: <PlaceholderPage title="Gen Assist AI Agent" />,
      },
      {
        path: 'quit',
        element: <PlaceholderPage title="Session Ended" />,
      },
      {
        path: 'service/:moduleName',
        element: <PlaceholderPage />,
      },
    ],
  },
]);

export default router;