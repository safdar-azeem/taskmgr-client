# TaskMgr - Task Management System

A modern, full-featured task management application built with the MERN stack (MongoDB, Express, React, Node.js). TaskMgr enables teams to collaborate effectively by organizing tasks, managing team members, and tracking project progress.

## 🚀 Features

### Core Features

- **User Authentication & Authorization**

  - Email/Password registration with OTP verification
  - JWT-based authentication
  - Role-based access control (Admin, Lead, Member)
  - Secure session management with Zustand

- **Task Management**

  - Create, read, update, and delete tasks
  - Task status tracking (To Do, In Progress, Review, Done)
  - Priority levels (Low, Medium, High)
  - Task assignment to team members
  - Due date management
  - Search and filter tasks by status
  - Pagination support

- **Team Management**

  - Create and manage teams
  - Add/remove team members
  - Team-based task assignment
  - Team activity tracking

- **Dashboard**

  - Real-time task statistics
  - Visual task status breakdown
  - Recent team activity
  - Quick action shortcuts
  - Performance metrics

- **UI/UX Features**
  - Dark/Light theme toggle
  - Responsive design (mobile, tablet, desktop)
  - Modern glassmorphic design elements
  - Loading states and error handling
  - Toast notifications
  - Modal-based forms
  - Interactive data tables with sorting and filtering

## 🛠️ Tech Stack

### Frontend

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM 7.11** - Client-side routing
- **Zustand 5.0** - State management
- **Axios 1.13** - HTTP client
- **Tailwind CSS 4.1** - Styling framework
- **Lucide React** - Icon library
- **date-fns** - Date utility library
- **clsx + tailwind-merge** - Conditional styling

### Backend (Assumed)

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication

## 📁 Folder Architecture

```
taskmgr-client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── form/
│   │   │   ├── Form.tsx              # Main form wrapper component
│   │   │   ├── FormField.tsx         # Dynamic form field renderer
│   │   │   ├── Input.tsx             # Input component
│   │   │   ├── Select.tsx            # Select dropdown component
│   │   │   └── Selects.tsx           # Custom select components (SelectTeam)
│   │   └── ui/
│   │       ├── Avatar.tsx            # User avatar component
│   │       ├── Badge.tsx             # Status badge component
│   │       ├── Button.tsx            # Reusable button component
│   │       ├── Card.tsx              # Card container components
│   │       ├── DataTable.tsx         # Paginated data table with search/filter
│   │       ├── Input.tsx             # Standalone input component
│   │       ├── Modal.tsx             # Modal dialog component
│   │       ├── Spinner.tsx           # Loading spinner
│   │       └── ThemeSwitch.tsx       # Dark/Light theme toggle
│   ├── constants/
│   │   └── index.ts                  # App-wide constants (routes, colors, etc.)
│   ├── hooks/
│   │   ├── useForm.ts                # Custom form management hook
│   │   └── useTheme.ts               # Theme management hook
│   ├── lib/
│   │   ├── axios.ts                  # Axios instance with interceptors
│   │   └── utils.ts                  # Utility functions (cn helper)
│   ├── modules/
│   │   ├── Auth/
│   │   │   ├── components/
│   │   │   │   └── AuthLayout.tsx    # Auth pages layout
│   │   │   ├── pages/
│   │   │   │   ├── Login.tsx         # Login page
│   │   │   │   ├── Signup.tsx        # Registration page
│   │   │   │   └── VerifyOtp.tsx     # OTP verification page
│   │   │   ├── routes/
│   │   │   │   └── index.tsx         # Auth route definitions
│   │   │   ├── schema/
│   │   │   │   └── schema.ts         # Form validation schemas
│   │   │   └── service/
│   │   │       └── auth.service.ts   # Auth API calls
│   │   ├── Dashboard/
│   │   │   ├── pages/
│   │   │   │   └── Dashboard.tsx     # Main dashboard page
│   │   │   └── routes/
│   │   │       └── index.tsx         # Dashboard routes
│   │   ├── Layout/
│   │   │   ├── Header.tsx            # App header with user info
│   │   │   ├── MainLayout.tsx        # Main app layout wrapper
│   │   │   └── Sidebar.tsx           # Navigation sidebar
│   │   ├── Tasks/
│   │   │   ├── components/
│   │   │   │   ├── TaskColumns.tsx   # Table column definitions
│   │   │   │   └── TaskForm.tsx      # Task create/edit form
│   │   │   ├── hooks/
│   │   │   │   └── useTasks.ts       # Task data management hook
│   │   │   ├── pages/
│   │   │   │   └── TaskList.tsx      # Task list page
│   │   │   ├── routes/
│   │   │   │   └── index.tsx         # Task routes
│   │   │   ├── schema/
│   │   │   │   └── task.schema.ts    # Task form schema
│   │   │   └── service/
│   │   │       └── task.service.ts   # Task API calls
│   │   └── Teams/
│   │       ├── components/
│   │       │   ├── TeamColumns.tsx   # Team table columns
│   │       │   └── TeamForm.tsx      # Team create/edit form
│   │       ├── hooks/
│   │       │   └── useTeams.ts       # Team data management hook
│   │       ├── pages/
│   │       │   └── TeamList.tsx      # Team list page
│   │       ├── routes/
│   │       │   └── index.tsx         # Team routes
│   │       ├── schema/
│   │       │   └── team.schema.ts    # Team form schema
│   │       └── service/
│   │           └── team.service.ts   # Team API calls
│   ├── routes/
│   │   └── index.tsx                 # Root route configuration
│   ├── store/
│   │   └── useAuthStore.ts           # Global auth state (Zustand)
│   ├── types/
│   │   ├── form.types.ts             # Form-related types
│   │   └── index.ts                  # Core application types
│   ├── utils/
│   │   ├── form.utils.ts             # Form helper functions
│   │   └── object.utils.ts           # Object manipulation utilities
│   ├── App.tsx                       # Root app component
│   ├── index.css                     # Global styles and Tailwind config
│   └── main.tsx                      # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## 🚦 Setup & Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn** or **pnpm**
- Backend API running (see Backend Setup section)

### Frontend Installation

```bash
   cd taskmgr-client
```

2. **Install dependencies**

```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

```env
   VITE_API_URL=http://localhost:4003/api
```

4. **Start development server**

```bash
   npm run dev
```

The application will be available at `http://localhost:5173`

5. **Build for production**

```bash
   npm run build
```

6. **Preview production build**

```bash
   npm run preview
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:4003/api` |

## 🎨 Design System

### Color Palette

- **Primary**: Indigo/Blue shades
- **Success**: Green shades
- **Danger**: Red shades
- **Warning**: Yellow/Amber shades
- **Info**: Blue shades
- **Gray Scale**: 50-900

### Theme Support

- Light mode (default)
- Dark mode with persistent storage

### Component Variants

- Buttons: primary, secondary, outline, ghost, danger
- Badges: default, outline, secondary, danger, success, warning, info
- Inputs: default with validation states

## 📱 Application Flow

### Authentication Flow

1. User visits app → Redirected to login
2. New user → Register → Verify OTP → Dashboard
3. Existing user → Login → Dashboard
4. Protected routes check authentication state
5. Invalid/expired token → Auto logout → Login

### Task Management Flow

1. View tasks in paginated table
2. Search/filter tasks by status
3. Click task → View/Edit modal
4. Create new task → Assign to team → Set priority/due date
5. Update task status → Real-time dashboard update
6. Delete task → Confirmation modal

### Team Management Flow

1. View teams list
2. Create team → Add description
3. Edit team details
4. Add members to team
5. Assign tasks to team

## 🔧 Key Features Implementation

### Form System

- Dynamic form generation from schema
- Built-in validation
- Nested field support
- Conditional field rendering
- Error handling

### Data Tables

- Server-side pagination
- Search functionality
- Column sorting
- Status filtering
- Row click actions

### State Management

- Zustand for global state (auth)
- React hooks for local state
- Persistent storage for theme and auth

### API Integration

- Axios interceptors for auth tokens
- Automatic token refresh handling
- Global error handling
- Request/response transformation

## 🧪 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🌐 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration for SPA routing:

```bash
vercel --prod
```

### Environment Setup

1. Set `VITE_API_URL` in Vercel environment variables
2. Connect GitHub repository
3. Auto-deploy on push to main branch

## 🔒 Security Features

- JWT token authentication
- Secure HTTP-only cookies (backend)
- Protected routes
- CORS configuration
- XSS protection
- Input validation and sanitization

## 🎯 Best Practices Implemented

- **Modular Architecture**: Feature-based folder structure
- **Type Safety**: Full TypeScript coverage
- **Code Reusability**: Shared components and hooks
- **Performance**: Code splitting, lazy loading, memoization
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Error Handling**: Try-catch blocks, fallback UI
- **Consistent Styling**: Tailwind CSS utility classes
- **API Abstraction**: Service layer pattern
- **State Management**: Minimal global state, local state where possible

## 📝 Code Style

- **Prettier** configured with 120 character line width
- **ESLint** for code quality
- **TypeScript** strict mode disabled for flexibility
- **Consistent naming**: camelCase for variables, PascalCase for components

**Built with ❤️ by Safdar Azeem**
