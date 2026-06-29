import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context';

// Layouts
import { AppLayout }  from '@/layouts/AppLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Auth Pages
import { LoginPage }          from '@/pages/auth/LoginPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { VerifyOtpPage }      from '@/pages/auth/VerifyOtpPage';
import { ResetPasswordPage }  from '@/pages/auth/ResetPasswordPage';
import { SessionExpiredPage } from '@/pages/auth/SessionExpiredPage';
import { UnauthorizedPage }   from '@/pages/auth/UnauthorizedPage';

// App Pages
import { DashboardPage }     from '@/pages/dashboard/DashboardPage';
import { StudentsPage }      from '@/pages/students/StudentsPage';
import { StudentDetailPage } from '@/pages/students/StudentDetailPage';
import { FeesPage }          from '@/pages/fees/FeesPage';
import { AttendancePage }    from '@/pages/attendance/AttendancePage';
import { AnalyticsPage }     from '@/pages/analytics/AnalyticsPage';
import { ReportsPage }       from '@/pages/reports/ReportsPage';
import { NotificationsPage } from '@/pages/notifications/NotificationsPage';
import { AutomationPage }    from '@/pages/automation/AutomationPage';
import { AIPage }            from '@/pages/ai/AIPage';
import { SettingsPage }      from '@/pages/settings/SettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login',           element: <PublicRoute><LoginPage /></PublicRoute> },
      { path: '/forgot-password', element: <PublicRoute><ForgotPasswordPage /></PublicRoute> },
      { path: '/verify-otp',      element: <PublicRoute><VerifyOtpPage /></PublicRoute> },
      { path: '/reset-password',  element: <PublicRoute><ResetPasswordPage /></PublicRoute> },
      { path: '/session-expired', element: <SessionExpiredPage /> },
      { path: '/unauthorized',    element: <UnauthorizedPage /> },
    ],
  },
  {
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard',        element: <DashboardPage /> },
      { path: '/students',         element: <StudentsPage /> },
      { path: '/students/:id',     element: <StudentDetailPage /> },
      { path: '/fees',             element: <FeesPage /> },
      { path: '/attendance',       element: <AttendancePage /> },
      { path: '/analytics',        element: <AnalyticsPage /> },
      { path: '/reports',          element: <ReportsPage /> },
      { path: '/notifications',    element: <NotificationsPage /> },
      { path: '/automation',       element: <AutomationPage /> },
      { path: '/ai',               element: <AIPage /> },
      { path: '/settings',         element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
