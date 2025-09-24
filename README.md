# Smart Shifts Frontend

## 🚀 Setup Completed

The Smart Shifts frontend has been successfully set up with a modern, scalable architecture. Here's what's been implemented:

### ✅ **Core Setup**

1. **Next.js 15** with App Router
2. **TypeScript** with strict configuration
3. **Tailwind CSS** for styling
4. **Shadcn UI** components
5. **Axios** for HTTP requests
6. **Tanstack Query** for data fetching and caching

### ✅ **Project Structure**

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Homepage (setup demo)
├── components/
│   ├── providers/               # React providers
│   │   └── query-provider.tsx   # Tanstack Query provider
│   └── ui/                      # Shadcn UI components
│       └── button.tsx           # Example button component
├── constants/                   # Application constants
│   ├── endpoints.ts             # API endpoint definitions
│   ├── messages.ts              # User messages and labels
│   ├── enums.ts                 # TypeScript enums
│   └── index.ts                 # Central exports
├── features/                    # Feature-based organization
│   └── auth/                    # Authentication feature
│       ├── hooks/               # React Query hooks
│       │   └── use-auth.ts      # Authentication hooks
│       └── services/            # API services
│           └── auth.service.ts  # Auth API calls
├── hooks/                       # Shared hooks
│   └── use-api.ts              # Generic API hooks
├── lib/                         # Utilities and configurations
│   ├── api.ts                   # Axios instance with interceptors
│   └── query-client.ts          # Tanstack Query configuration
├── types/                       # TypeScript type definitions
│   └── api.ts                   # API response types
└── utils/                       # Utility functions
```

### ✅ **Features Implemented**

#### **1. API Integration**
- Configured Axios instance with interceptors
- Automatic token handling
- Error handling and logging
- Request/response debugging in development

#### **2. Data Fetching**
- Tanstack Query setup with devtools
- Query key factory for consistent caching
- Mutation handling with optimistic updates
- Background refetching and error recovery

#### **3. Authentication System**
- Complete auth service with all backend endpoints
- React Query hooks for auth operations
- Token management (access + refresh)
- Local storage integration

#### **4. Type Safety**
- Complete TypeScript types matching backend DTOs
- Enum definitions for consistency
- API response type safety
- Generic hooks with proper typing

#### **5. Constants & Configuration**
- All API endpoints organized and typed
- User-facing messages and labels
- Business logic constants
- Environment configuration

### ✅ **API Endpoints Available**

The frontend includes constants for all backend endpoints:

- **Authentication**: Login, register, password reset, email verification
- **Restaurants**: CRUD operations, subscription management
- **Venues**: Multi-venue support, location management
- **Staff**: Employee management, contract details, availability
- **Roles**: Role definitions, skill requirements
- **Schedules**: Schedule generation, publishing, AI optimization
- **Compliance**: Violation detection, reporting, resolution
- **Requests**: Staff requests, approval workflows
- **Incidents**: Operational disruption management
- **Time Tracking**: Punch records, timecards, GPS validation
- **Exports**: Report generation, file management
- **Analytics**: KPI tracking, manager efficiency
- **And more...**

### 🛠️ **Quick Start**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Add new Shadcn components:**
   ```bash
   npx shadcn@latest add [component-name]
   ```

### 📋 **Environment Variables**

Configure these in your `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Feature Flags
NEXT_PUBLIC_ENABLE_DEVTOOLS=true
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
```

### 🎯 **Next Steps**

Now you can start building the application features:

1. **Authentication Pages**
   - Login/register forms
   - Password reset flow
   - Email verification

2. **Dashboard Layout**
   - Navigation sidebar
   - Header with user menu
   - Breadcrumbs

3. **Feature Pages**
   - Restaurant management
   - Staff scheduling
   - Compliance monitoring
   - Analytics dashboard

4. **Components**
   - Data tables with pagination
   - Charts and visualizations
   - Forms with validation
   - Modal dialogs

### 🔧 **Development Tips**

1. **Adding new features:**
   ```
   features/
   ├── [feature-name]/
   │   ├── components/     # Feature-specific components
   │   ├── hooks/          # React Query hooks
   │   ├── services/       # API services
   │   ├── types/          # Feature types
   │   └── utils/          # Feature utilities
   ```

2. **API service pattern:**
   ```typescript
   export const featureService = {
     async getAll(): Promise<Item[]> {
       const response = await apiHelpers.get<ApiResponse<Item[]>>(
         API_ENDPOINTS.FEATURE.BASE
       );
       return response.data.data!;
     },
     // ... other methods
   };
   ```

3. **React Query hook pattern:**
   ```typescript
   export function useFeatureList() {
     return useQuery({
       queryKey: queryKeys.feature.all,
       queryFn: featureService.getAll,
     });
   }
   ```

### 📚 **Documentation**

- **Backend API**: Check `/backend/README.md` for API documentation
- **Shadcn UI**: [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Tanstack Query**: [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)

### 🎨 **Styling**

- **Tailwind CSS** for utility-first styling
- **Shadcn UI** for beautiful, accessible components
- **CSS Variables** for consistent theming
- **Dark mode** support (can be enabled)

### 🔄 **State Management**

- **Tanstack Query** for server state
- **React hooks** for local component state
- **Context API** for global UI state (when needed)
- **Local Storage** for persistence

---

**✨ The frontend is now ready for development! Start building amazing features for Smart Shifts.**# Frontend_main
# Ristowai-fe
# Ristowai-fe
