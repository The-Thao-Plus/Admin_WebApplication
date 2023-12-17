import { Navigate, Route, Routes } from 'react-router-dom';
import {
  DashboardAppPage,
  ForgotPasswordPage,
  ListAccountOwnerPage,
  ListAccountPage,
  ListBookingPage,
  LoginPage,
  Page404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  SportPage,
} from 'src/pages';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const publicRoute = [
  {
    key: 'login',
    path: 'login',
    component: <LoginPage />,
    index: true,
  },
  {
    key: 'register',
    path: 'register',
    component: <RegisterPage />,
    index: false,
  },
  {
    key: 'forgot-password',
    path: 'forgot-password',
    component: <ForgotPasswordPage />,
    index: false,
  },
  {
    key: 'reset-password',
    path: 'reset-password/:token',
    component: <ResetPasswordPage />,
    index: false,
  },
];

export const adminRoute = [
  {
    path: 'app',
    component: <DashboardAppPage />,
  },
  {
    path: 'sport',
    component: <SportPage />,
  },
  {
    path: 'list-account',
    component: <ListAccountPage />,
  },
  {
    path: 'list-owner',
    component: <ListAccountOwnerPage />,
  },
  {
    path: 'list-Booking',
    component: <ListBookingPage />,
  },
  {
    path: 'profile',
    component: <ProfilePage />,
  },
];

function Router() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route element={<Navigate to="/login" />} index={true} />
        {publicRoute.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route element={<SimpleLayout />}>
        <Route element={<Navigate to="/dashboard/app" />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Page404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<Navigate to="/dashboard/app" />} index={true} />
          {adminRoute.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
