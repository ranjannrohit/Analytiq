import type { Student, FeeRecord, Transaction, AttendanceRecord, Notification, AutomationRule, ActivityItem, BatchAttendance, RevenueDataPoint, KPICard } from '@/types';

// ─── Students ─────────────────────────────────────────────────────────────────
export const MOCK_STUDENTS: Student[] = [
  { id:'s1', enrollmentNo:'AQ-2024-001', name:'Aarav Sharma', email:'aarav@example.com', phone:'9876543210', parentPhone:'9876543211', parentName:'Rajesh Sharma', batch:'Batch A', course:'Data Science', status:'active', joinDate:'2024-01-15', address:'12 MG Road, Delhi', dob:'2000-03-15', gender:'male', totalFees:48000, paidFees:36000, pendingFees:12000, attendancePercent:92, createdAt:'2024-01-15T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s2', enrollmentNo:'AQ-2024-002', name:'Priya Patel',   email:'priya@example.com', phone:'9876543220', parentPhone:'9876543221', parentName:'Suresh Patel', batch:'Batch B', course:'Web Development', status:'active', joinDate:'2024-01-20', address:'45 Park Street, Mumbai', dob:'2001-07-22', gender:'female', totalFees:36000, paidFees:36000, pendingFees:0, attendancePercent:98, createdAt:'2024-01-20T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s3', enrollmentNo:'AQ-2024-003', name:'Rohit Kumar',   email:'rohit@example.com', phone:'9876543230', parentPhone:'9876543231', parentName:'Vijay Kumar', batch:'Batch A', course:'Computer Science', status:'active', joinDate:'2024-02-01', address:'8 Gandhi Nagar, Bangalore', dob:'1999-11-08', gender:'male', totalFees:52000, paidFees:26000, pendingFees:26000, attendancePercent:78, createdAt:'2024-02-01T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s4', enrollmentNo:'AQ-2024-004', name:'Sneha Gupta',   email:'sneha@example.com', phone:'9876543240', parentPhone:'9876543241', parentName:'Amit Gupta', batch:'Morning Batch', course:'Digital Marketing', status:'active', joinDate:'2024-02-10', address:'33 Nehru Place, Pune', dob:'2002-05-30', gender:'female', totalFees:28000, paidFees:14000, pendingFees:14000, attendancePercent:85, createdAt:'2024-02-10T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s5', enrollmentNo:'AQ-2024-005', name:'Arjun Mehta',   email:'arjun@example.com', phone:'9876543250', parentPhone:'9876543251', parentName:'Dinesh Mehta', batch:'Batch C', course:'Business Analytics', status:'inactive', joinDate:'2024-01-05', address:'7 Lake View, Hyderabad', dob:'2000-09-14', gender:'male', totalFees:44000, paidFees:44000, pendingFees:0, attendancePercent:65, createdAt:'2024-01-05T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s6', enrollmentNo:'AQ-2024-006', name:'Kavya Nair',    email:'kavya@example.com', phone:'9876543260', parentPhone:'9876543261', parentName:'Ravi Nair', batch:'Evening Batch', course:'Graphic Design', status:'active', joinDate:'2024-03-01', address:'22 Marine Drive, Kochi', dob:'2001-12-03', gender:'female', totalFees:32000, paidFees:32000, pendingFees:0, attendancePercent:94, createdAt:'2024-03-01T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s7', enrollmentNo:'AQ-2024-007', name:'Dev Sinha',     email:'dev@example.com', phone:'9876543270', parentPhone:'9876543271', parentName:'Manoj Sinha', batch:'Batch A', course:'Data Science', status:'active', joinDate:'2024-01-18', address:'5 Salt Lake, Kolkata', dob:'2000-06-25', gender:'male', totalFees:48000, paidFees:16000, pendingFees:32000, attendancePercent:71, createdAt:'2024-01-18T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
  { id:'s8', enrollmentNo:'AQ-2024-008', name:'Ananya Singh',  email:'ananya@example.com', phone:'9876543280', parentPhone:'9876543281', parentName:'Pankaj Singh', batch:'Batch B', course:'Web Development', status:'active', joinDate:'2024-02-22', address:'15 Civil Lines, Jaipur', dob:'2002-02-17', gender:'female', totalFees:36000, paidFees:36000, pendingFees:0, attendancePercent:96, createdAt:'2024-02-22T09:00:00Z', updatedAt:'2024-06-01T10:00:00Z' },
];

// ─── Fee Records ──────────────────────────────────────────────────────────────
export const MOCK_FEE_RECORDS: FeeRecord[] = [
  { id:'f1', studentId:'s1', studentName:'Aarav Sharma', enrollmentNo:'AQ-2024-001', batch:'Batch A', amount:12000, paid:12000, pending:0, dueDate:'2024-04-01', paidDate:'2024-03-28', status:'paid', method:'upi', month:'April 2024', receiptNo:'RCP-0001', createdAt:'2024-03-01T09:00:00Z' },
  { id:'f2', studentId:'s1', studentName:'Aarav Sharma', enrollmentNo:'AQ-2024-001', batch:'Batch A', amount:12000, paid:0, pending:12000, dueDate:'2024-05-01', status:'overdue', month:'May 2024', receiptNo:'RCP-0002', createdAt:'2024-04-01T09:00:00Z' },
  { id:'f3', studentId:'s2', studentName:'Priya Patel', enrollmentNo:'AQ-2024-002', batch:'Batch B', amount:9000, paid:9000, pending:0, dueDate:'2024-06-01', paidDate:'2024-06-01', status:'paid', method:'bank_transfer', month:'June 2024', receiptNo:'RCP-0003', createdAt:'2024-05-01T09:00:00Z' },
  { id:'f4', studentId:'s3', studentName:'Rohit Kumar', enrollmentNo:'AQ-2024-003', batch:'Batch A', amount:13000, paid:5000, pending:8000, dueDate:'2024-06-01', status:'partial', method:'cash', month:'June 2024', receiptNo:'RCP-0004', createdAt:'2024-05-01T09:00:00Z' },
  { id:'f5', studentId:'s4', studentName:'Sneha Gupta', enrollmentNo:'AQ-2024-004', batch:'Morning Batch', amount:7000, paid:0, pending:7000, dueDate:'2024-05-15', status:'overdue', month:'May 2024', createdAt:'2024-04-15T09:00:00Z' },
  { id:'f6', studentId:'s7', studentName:'Dev Sinha', enrollmentNo:'AQ-2024-007', batch:'Batch A', amount:12000, paid:0, pending:12000, dueDate:'2024-06-01', status:'pending', month:'June 2024', createdAt:'2024-05-01T09:00:00Z' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id:'t1', studentId:'s1', studentName:'Aarav Sharma', amount:12000, method:'upi', receiptNo:'RCP-0001', date:'2024-03-28T10:30:00Z', collectedBy:'Riya Admin', status:'success' },
  { id:'t2', studentId:'s2', studentName:'Priya Patel', amount:9000, method:'bank_transfer', receiptNo:'RCP-0003', date:'2024-06-01T11:00:00Z', collectedBy:'Riya Admin', status:'success' },
  { id:'t3', studentId:'s3', studentName:'Rohit Kumar', amount:5000, method:'cash', receiptNo:'RCP-0004', date:'2024-05-28T14:00:00Z', collectedBy:'Riya Admin', status:'success' },
  { id:'t4', studentId:'s6', studentName:'Kavya Nair', amount:8000, method:'upi', receiptNo:'RCP-0005', date:'2024-06-10T09:30:00Z', collectedBy:'Riya Admin', status:'success' },
  { id:'t5', studentId:'s8', studentName:'Ananya Singh', amount:9000, method:'card', receiptNo:'RCP-0006', date:'2024-06-12T16:00:00Z', collectedBy:'Riya Admin', status:'success' },
];

// ─── Attendance ───────────────────────────────────────────────────────────────
export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id:'a1', studentId:'s1', studentName:'Aarav Sharma', date:'2024-06-28', status:'present', batch:'Batch A', markedBy:'Teacher A', markedAt:'2024-06-28T09:05:00Z' },
  { id:'a2', studentId:'s2', studentName:'Priya Patel', date:'2024-06-28', status:'present', batch:'Batch B', markedBy:'Teacher B', markedAt:'2024-06-28T09:06:00Z' },
  { id:'a3', studentId:'s3', studentName:'Rohit Kumar', date:'2024-06-28', status:'absent', batch:'Batch A', markedBy:'Teacher A', markedAt:'2024-06-28T09:07:00Z' },
  { id:'a4', studentId:'s4', studentName:'Sneha Gupta', date:'2024-06-28', status:'late', batch:'Morning Batch', markedBy:'Teacher C', markedAt:'2024-06-28T10:15:00Z' },
  { id:'a5', studentId:'s6', studentName:'Kavya Nair', date:'2024-06-28', status:'present', batch:'Evening Batch', markedBy:'Teacher D', markedAt:'2024-06-28T17:05:00Z' },
  { id:'a6', studentId:'s7', studentName:'Dev Sinha', date:'2024-06-28', status:'absent', batch:'Batch A', markedBy:'Teacher A', markedAt:'2024-06-28T09:08:00Z' },
  { id:'a7', studentId:'s8', studentName:'Ananya Singh', date:'2024-06-28', status:'present', batch:'Batch B', markedBy:'Teacher B', markedAt:'2024-06-28T09:09:00Z' },
];

export const MOCK_BATCH_ATTENDANCE: BatchAttendance[] = [
  { batchId:'b1', batchName:'Batch A', date:'2024-06-28', total:25, present:21, absent:3, late:1, percentage:84 },
  { batchId:'b2', batchName:'Batch B', date:'2024-06-28', total:20, present:19, absent:1, late:0, percentage:95 },
  { batchId:'b3', batchName:'Morning Batch', date:'2024-06-28', total:18, present:14, absent:2, late:2, percentage:78 },
  { batchId:'b4', batchName:'Evening Batch', date:'2024-06-28', total:22, present:20, absent:2, late:0, percentage:91 },
];

// ─── Revenue Chart Data ───────────────────────────────────────────────────────
export const MOCK_REVENUE_DATA: RevenueDataPoint[] = [
  { month:'Jan', revenue:285000, target:300000, collected:270000 },
  { month:'Feb', revenue:310000, target:300000, collected:295000 },
  { month:'Mar', revenue:298000, target:320000, collected:280000 },
  { month:'Apr', revenue:342000, target:320000, collected:330000 },
  { month:'May', revenue:325000, target:340000, collected:310000 },
  { month:'Jun', revenue:368000, target:340000, collected:355000 },
];

// ─── KPI Cards ────────────────────────────────────────────────────────────────
export const MOCK_KPI: KPICard[] = [
  { id:'k1', title:"Today's Revenue", value:'₹52,400', change:12.5, changeType:'increase', changeLabel:'vs yesterday', icon:'IndianRupee', color:'brand', prefix:'₹' },
  { id:'k2', title:'Total Revenue', value:'₹18.5L', change:8.2, changeType:'increase', changeLabel:'vs last month', icon:'TrendingUp', color:'success' },
  { id:'k3', title:'Pending Amount', value:'₹3.2L', change:-5.1, changeType:'decrease', changeLabel:'vs last month', icon:'Clock', color:'warning' },
  { id:'k4', title:'Total Students', value:'247', change:4, changeType:'increase', changeLabel:'new this month', icon:'Users', color:'info' },
  { id:'k5', title:"Today's Attendance", value:'91%', change:2.3, changeType:'increase', changeLabel:'vs yesterday', icon:'UserCheck', color:'success' },
  { id:'k6', title:'Collection Rate', value:'82%', change:-1.2, changeType:'decrease', changeLabel:'vs last month', icon:'BarChart3', color:'brand' },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id:'n1', title:'Fee Due Reminder', message:'Your fee of ₹12,000 is due on June 30.', channel:'whatsapp', status:'sent', recipient:'Aarav Sharma', recipientId:'s1', sentAt:'2024-06-25T09:00:00Z', createdAt:'2024-06-25T09:00:00Z' },
  { id:'n2', title:'Attendance Alert', message:'Rohit Kumar was absent today.', channel:'sms', status:'sent', recipient:'Vijay Kumar', recipientId:'s3', sentAt:'2024-06-28T10:00:00Z', createdAt:'2024-06-28T10:00:00Z' },
  { id:'n3', title:'Fee Overdue Notice', message:"Sneha's fee is overdue by 45 days.", channel:'whatsapp', status:'failed', recipient:'Amit Gupta', recipientId:'s4', createdAt:'2024-06-28T08:00:00Z' },
  { id:'n4', title:'Welcome Message', message:'Welcome to Analytiq! Your admission is confirmed.', channel:'email', status:'sent', recipient:'Ananya Singh', recipientId:'s8', sentAt:'2024-02-22T12:00:00Z', createdAt:'2024-02-22T12:00:00Z' },
  { id:'n5', title:'Monthly Report', message:'Your monthly report for May 2024 is ready.', channel:'email', status:'scheduled', recipient:'Owner', recipientId:'owner1', scheduledAt:'2024-06-30T08:00:00Z', createdAt:'2024-06-28T07:00:00Z' },
];

// ─── Automation Rules ─────────────────────────────────────────────────────────
export const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  { id:'r1', name:'Fee Due Alert', description:'Send WhatsApp when fee is 3 days away from due date', trigger:'fee_due', triggerConfig:{ daysBefore:3 }, action:'send_whatsapp', actionConfig:{ templateId:'fee_due_reminder' }, isActive:true, runCount:142, lastRun:'2024-06-25T09:00:00Z', createdAt:'2024-01-01T00:00:00Z' },
  { id:'r2', name:'Absent Parent Alert', description:'Notify parent via SMS when student is absent', trigger:'student_absent', triggerConfig:{}, action:'send_sms', actionConfig:{ message:'Your child was absent today.' }, isActive:true, runCount:87, lastRun:'2024-06-28T10:00:00Z', createdAt:'2024-01-01T00:00:00Z' },
  { id:'r3', name:'Revenue Drop Alert', description:'Notify owner when daily revenue drops below target', trigger:'revenue_drop', triggerConfig:{ threshold:0.2 }, action:'notify_owner', actionConfig:{}, isActive:true, runCount:5, lastRun:'2024-06-15T18:00:00Z', createdAt:'2024-02-01T00:00:00Z' },
  { id:'r4', name:'Admission Dashboard Sync', description:'Auto-update dashboard on new admission', trigger:'admission_added', triggerConfig:{}, action:'update_dashboard', actionConfig:{}, isActive:true, runCount:247, lastRun:'2024-06-22T14:00:00Z', createdAt:'2024-01-01T00:00:00Z' },
  { id:'r5', name:'Fee Overdue Escalation', description:'Send overdue reminder after 7 days of due date', trigger:'fee_overdue', triggerConfig:{ daysAfter:7 }, action:'send_whatsapp', actionConfig:{ templateId:'fee_overdue' }, isActive:false, runCount:34, lastRun:'2024-06-20T11:00:00Z', createdAt:'2024-03-01T00:00:00Z' },
];

// ─── Activity Timeline ────────────────────────────────────────────────────────
export const MOCK_ACTIVITIES: ActivityItem[] = [
  { id:'ac1', type:'payment', title:'Fee Collected', description:'₹12,000 collected from Aarav Sharma', user:'Riya Admin', timestamp:'2024-06-28T11:30:00Z' },
  { id:'ac2', type:'admission', title:'New Admission', description:'Ananya Singh enrolled in Web Development', user:'Manager', timestamp:'2024-06-28T10:15:00Z' },
  { id:'ac3', type:'attendance', title:'Attendance Marked', description:'Batch A attendance marked — 21/25 present', user:'Teacher A', timestamp:'2024-06-28T09:10:00Z' },
  { id:'ac4', type:'notification', title:'Reminder Sent', description:'Fee due reminder sent to 12 students', user:'System', timestamp:'2024-06-28T09:00:00Z' },
  { id:'ac5', type:'report', title:'Report Generated', description:'Monthly revenue report for May 2024', user:'Accountant', timestamp:'2024-06-27T17:00:00Z' },
  { id:'ac6', type:'payment', title:'Fee Collected', description:'₹9,000 collected from Priya Patel', user:'Riya Admin', timestamp:'2024-06-27T14:45:00Z' },
  { id:'ac7', type:'task', title:'Task Completed', description:'Follow up with Rohit Kumar for pending fee', user:'Manager', timestamp:'2024-06-27T12:00:00Z' },
];
