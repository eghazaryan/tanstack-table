import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { FloatingIndicator } from './components/FloatingIndicator/FloatingIndicator';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/input',
    element: <FloatingIndicator />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
