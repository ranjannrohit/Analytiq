// ─── Auth Types ──────────────────────────────────────────────────────────────
export type UserRole = 'owner' | 'manager' | 'staff' | 'accountant' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  instituteName: string;
  instituteId: string;
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
}

export type Permission =
  | 'students:read' | 'students:write' | 'students:delete'
  | 'fees:read' | 'fees:write' | 'fees:collect'
  | 'attendance:read' | 'attendance:write'
  | 'reports:read' | 'reports:generate'
  | 'analytics:read'
  | 'notifications:read' | 'notifications:send'
  | 'automation:read' | 'automation:write'
  | 'settings:read' | 'settings:write'
  | 'ai:access';

export interface AuthSession {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

// ─── Student Types ────────────────────────────────────────────────────────────
export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended';

export interface Student {
  id: string;
  enrollmentNo: string;
  name: string;
  email: string;
  phone: string;
  parentPhone: string;
  parentName: string;
  batch: string;
  course: string;
  status: StudentStatus;
  avatar?: string;
  joinDate: string;
  address: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  attendancePercent: number;
  notes?: string;
  documents?: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

// ─── Fee Types ────────────────────────────────────────────────────────────────
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial' | 'waived';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'bank_transfer' | 'cheque' | 'online';

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  enrollmentNo: string;
  batch: string;
  amount: number;
  paid: number;
  pending: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  month: string;
  receiptNo?: string;
  notes?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: PaymentMethod;
  receiptNo: string;
  date: string;
  collectedBy: string;
  status: 'success' | 'failed' | 'refunded';
}

// ─── Attendance Types ─────────────────────────────────────────────────────────
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'holiday' | 'leave';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: AttendanceStatus;
  batch: string;
  markedBy: string;
  markedAt: string;
  notes?: string;
}

export interface BatchAttendance {
  batchId: string;
  batchName: string;
  date: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

// ─── Analytics Types ──────────────────────────────────────────────────────────
export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
  collected: number;
}

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  changeLabel: string;
  icon: string;
  color: 'brand' | 'success' | 'warning' | 'danger' | 'info';
  prefix?: string;
  suffix?: string;
}

// ─── Notification Types ───────────────────────────────────────────────────────
export type NotificationChannel = 'whatsapp' | 'email' | 'sms' | 'in_app';
export type NotificationStatus = 'sent' | 'pending' | 'failed' | 'scheduled';

export interface Notification {
  id: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  recipient: string;
  recipientId: string;
  scheduledAt?: string;
  sentAt?: string;
  template?: string;
  createdAt: string;
}

// ─── Automation Types ─────────────────────────────────────────────────────────
export type AutomationTrigger =
  | 'fee_due' | 'fee_overdue' | 'student_absent'
  | 'revenue_drop' | 'admission_added' | 'custom';

export type AutomationAction =
  | 'send_whatsapp' | 'send_email' | 'send_sms'
  | 'notify_owner' | 'update_dashboard' | 'create_task';

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  triggerConfig: Record<string, unknown>;
  action: AutomationAction;
  actionConfig: Record<string, unknown>;
  isActive: boolean;
  runCount: number;
  lastRun?: string;
  createdAt: string;
}

// ─── Activity Types ───────────────────────────────────────────────────────────
export interface ActivityItem {
  id: string;
  type: 'admission' | 'payment' | 'attendance' | 'notification' | 'report' | 'task';
  title: string;
  description: string;
  user: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ─── API Types ────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  meta?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams extends PaginationParams {
  status?: string;
  batch?: string;
  dateFrom?: string;
  dateTo?: string;
}
