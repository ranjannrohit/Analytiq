# Analytiq — AI Powered Business Analytics & Automation Platform

> Production-ready SaaS frontend built with React 19 + TypeScript + Tailwind CSS

## 🚀 Quick Start

```bash
npm install
npm run dev        # Development server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

**Demo Login:** `riya@analytiq.in` / `password`

---

## 🏗️ Architecture

```
src/
├── components/           # Reusable UI components
│   ├── ui/               # Design system (Button, Input, Card, Badge, Avatar, Skeleton)
│   ├── layout/           # Sidebar, TopBar
│   ├── common/           # Shared business components
│   └── charts/           # Chart wrappers
│
├── pages/                # Route-level page components
│   ├── auth/             # Login, ForgotPassword, VerifyOtp, ResetPassword
│   ├── dashboard/        # Executive dashboard + sub-components
│   ├── students/         # Students list + detail
│   ├── fees/             # Fee management + transactions
│   ├── attendance/       # Daily + batch attendance
│   ├── analytics/        # Charts and KPI analysis
│   ├── reports/          # Report generation + history
│   ├── notifications/    # Multi-channel notification center
│   ├── automation/       # Visual automation rule builder
│   ├── ai/               # AI chat assistant
│   └── settings/         # Institute config + team management
│
├── layouts/              # AppLayout (sidebar + topbar), AuthLayout
├── routes/               # Protected/Public routing with role guards
├── contexts/             # AuthContext, ThemeContext
├── hooks/                # useAuth, useTheme, useDebounce, useStudents, useDashboard…
├── services/             # Mock service layer (API-ready, swap backend by changing these)
│   ├── auth.service.ts
│   ├── students.service.ts
│   ├── fees.service.ts
│   ├── dashboard.service.ts
│   └── mock-data.ts
├── types/                # Full TypeScript definitions for all entities
├── constants/            # Routes, permissions, status colors, config
├── lib/                  # utils (cn, formatCurrency, formatDate, timeAgo…)
└── styles/               # Global CSS with CSS custom properties (light/dark)
```

---

## 🔌 Backend Integration

All data flows through `src/services/*.service.ts`. Replace mock implementations with real API calls — zero frontend changes required.

```typescript
// services/students.service.ts — BEFORE (mock)
async getAll(params) {
  await delay(600);
  return { data: MOCK_STUDENTS, ... };
}

// services/students.service.ts — AFTER (real API)
async getAll(params) {
  const res = await fetch(`${API_BASE_URL}/students?${toQueryString(params)}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}
```

---

## 👥 User Roles & Permissions

| Role | Access |
|------|--------|
| **Owner** | Full access to everything |
| **Manager** | Students, fees, attendance, notifications |
| **Accountant** | Fees, reports, analytics |
| **Teacher** | Attendance, student view |
| **Staff** | Attendance, basic student view |

---

## 🎨 Design System

- **Colors**: Brand (indigo), Surface (zinc-based), Semantic (success/warning/danger/info)
- **Theme**: Dark/Light/System via CSS custom properties
- **Typography**: Inter (display + body), JetBrains Mono (code/data)
- **Components**: Button, Input, Card, Badge, StatusBadge, Avatar, Skeleton, all CSS-variable aware

---

## 📦 Tech Stack

| Library | Purpose |
|---------|---------|
| React 19 + TypeScript | UI framework |
| Vite | Build tool |
| TailwindCSS v3 | Styling |
| React Router v6 | Routing |
| TanStack Query v5 | Server state management |
| React Hook Form + Zod | Form validation |
| Framer Motion | Animations |
| Recharts | Data visualization |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| date-fns | Date formatting |

---

## 📄 Pages Implemented

- ✅ Login, Forgot Password, Verify OTP, Reset Password, Session Expired, Unauthorized
- ✅ Dashboard (KPI cards, revenue chart, attendance, activity timeline, pending fees)
- ✅ Students (table, search, filter, pagination, detail page)
- ✅ Fee Management (records, transactions, summary cards, tabs)
- ✅ Attendance (daily view, batch view, statistics)
- ✅ Analytics (multi-chart, course distribution, batch performance)
- ✅ Reports (generate, schedule, download history)
- ✅ Notifications (multi-channel, templates, status tracking)
- ✅ Automation (visual rule builder, toggle active/paused)
- ✅ AI Assistant (chat UI, real-time responses, example prompts)
- ✅ Settings (institute details, team, appearance, security, notifications)

---

*Built for production. Scalable to thousands of businesses.*
