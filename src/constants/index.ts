export const APP_NAME = 'Analytiq';
export const APP_TAGLINE = 'AI Powered Business Analytics & Automation';
export const APP_VERSION = '1.0.0';

export const ROLE_PERMISSIONS = {
  owner:     ['students:read','students:write','students:delete','fees:read','fees:write','fees:collect','attendance:read','attendance:write','reports:read','reports:generate','analytics:read','notifications:read','notifications:send','automation:read','automation:write','settings:read','settings:write','ai:access'],
  manager:   ['students:read','students:write','fees:read','fees:write','fees:collect','attendance:read','attendance:write','reports:read','reports:generate','analytics:read','notifications:read','notifications:send','automation:read'],
  staff:     ['students:read','attendance:read','attendance:write','fees:read','notifications:read'],
  accountant:['students:read','fees:read','fees:write','fees:collect','reports:read','reports:generate','analytics:read'],
  teacher:   ['students:read','attendance:read','attendance:write','notifications:read'],
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_OTP: '/verify-otp',
  CREATE_PASSWORD: '/create-password',
  SESSION_EXPIRED: '/session-expired',
  UNAUTHORIZED: '/unauthorized',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  STUDENT_DETAIL: '/students/:id',
  FEES: '/fees',
  ATTENDANCE: '/attendance',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  NOTIFICATIONS: '/notifications',
  AUTOMATION: '/automation',
  AI: '/ai',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  HELP: '/help',
} as const;

export const BATCH_LIST = ['Batch A', 'Batch B', 'Batch C', 'Morning Batch', 'Evening Batch', 'Weekend Batch'];
export const COURSE_LIST = ['Computer Science', 'Data Science', 'Web Development', 'Digital Marketing', 'Graphic Design', 'Business Analytics'];

export const STATUS_COLORS = {
  active:     { bg: 'bg-success/10',   text: 'text-success',         border: 'border-success/20'   },
  inactive:   { bg: 'bg-surface-100',  text: 'text-surface-500',     border: 'border-surface-200'  },
  graduated:  { bg: 'bg-brand-100',    text: 'text-brand-700',       border: 'border-brand-200'    },
  suspended:  { bg: 'bg-danger/10',    text: 'text-danger',          border: 'border-danger/20'    },
  paid:       { bg: 'bg-success/10',   text: 'text-success',         border: 'border-success/20'   },
  pending:    { bg: 'bg-warning/10',   text: 'text-warning',         border: 'border-warning/20'   },
  overdue:    { bg: 'bg-danger/10',    text: 'text-danger',          border: 'border-danger/20'    },
  partial:    { bg: 'bg-info/10',      text: 'text-info',            border: 'border-info/20'      },
  waived:     { bg: 'bg-surface-100',  text: 'text-surface-500',     border: 'border-surface-200'  },
  present:    { bg: 'bg-success/10',   text: 'text-success',         border: 'border-success/20'   },
  absent:     { bg: 'bg-danger/10',    text: 'text-danger',          border: 'border-danger/20'    },
  late:       { bg: 'bg-warning/10',   text: 'text-warning',         border: 'border-warning/20'   },
  sent:       { bg: 'bg-success/10',   text: 'text-success',         border: 'border-success/20'   },
  failed:     { bg: 'bg-danger/10',    text: 'text-danger',          border: 'border-danger/20'    },
  scheduled:  { bg: 'bg-brand-100',    text: 'text-brand-700',       border: 'border-brand-200'    },
} as const;

export const PAYMENT_METHODS = [
  { value: 'cash',          label: 'Cash' },
  { value: 'upi',           label: 'UPI' },
  { value: 'card',          label: 'Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cheque',        label: 'Cheque' },
  { value: 'online',        label: 'Online' },
];

export const DATE_FORMAT  = 'dd MMM yyyy';
export const DATETIME_FORMAT = 'dd MMM yyyy, hh:mm a';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const MOCK_DELAY_MS = 600;

// API URL fallback for non-vite contexts
export const getApiBaseUrl = () => {
  try { return (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'; }
  catch { return 'http://localhost:8000/api/v1'; }
};
