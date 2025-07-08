import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductPage from './pages/dashboard/ProductPage';
import AuthLayout from './layouts/AuthLayout';
import SigninPage from './pages/auth/SigninPage';
import CartPage from './pages/dashboard/CartPage';
import PrivateRoute from './pages/rout/PrivateRouter';
import { Favorites } from './pages/dashboard/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        )
      },
      {
        path: '/favorite',
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        )
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/signin',
        element: <SigninPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export default router;
