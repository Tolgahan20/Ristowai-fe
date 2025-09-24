# 👥 Staff Management Feature

## 🎯 **Overview**

Complete staff and role management system with full CRUD operations, built with React Query for optimal data fetching and caching.

### **✅ Features Implemented:**

- ✅ **Staff CRUD Operations** - Create, read, update, delete staff members
- ✅ **Role Management** - Complete role lifecycle management
- ✅ **Self-Service Access** - Generate/revoke staff access tokens
- ✅ **Overtime Management** - Track and update annual overtime hours
- ✅ **Contract Management** - Multiple contract types with proper validation
- ✅ **Availability Preferences** - Days off, preferred hours, limits
- ✅ **Minor Protection** - Special handling for workers under 18
- ✅ **Advanced Filtering** - Search by name/email/phone, filter by role/status
- ✅ **Status Management** - Activate/deactivate staff members
- ✅ **Comprehensive UI** - List, form, and detail views

---

## 📋 **API Endpoints**

### **Staff Endpoints:**
```
POST   /api/staff/venue/{venueId}              - Create staff member
GET    /api/staff/venue/{venueId}              - Get all staff by venue
GET    /api/staff/venue/{venueId}/active       - Get active staff by venue
GET    /api/staff/role/{roleId}                - Get staff by role
GET    /api/staff/{id}                         - Get staff by ID
PATCH  /api/staff/{id}                         - Update staff member
DELETE /api/staff/{id}                         - Delete staff member
PATCH  /api/staff/{id}/toggle-active           - Toggle active status
POST   /api/staff/{id}/access-token            - Generate access token
DELETE /api/staff/{id}/access-token            - Revoke access token
PATCH  /api/staff/{id}/overtime-hours          - Update overtime hours
```

### **Role Endpoints:**
```
POST   /api/roles/venue/{venueId}              - Create role
GET    /api/roles/venue/{venueId}              - Get all roles by venue
GET    /api/roles/venue/{venueId}/active       - Get active roles by venue
GET    /api/roles/{id}                         - Get role by ID
PATCH  /api/roles/{id}                         - Update role
DELETE /api/roles/{id}                         - Delete role
PATCH  /api/roles/{id}/toggle-active           - Toggle role active status
GET    /api/roles/{id}/staff-count             - Get staff count for role
```

---

## 🏗️ **Architecture**

### **Directory Structure:**
```
features/staff/
├── components/
│   ├── StaffList.tsx           # Staff listing with filters/search
│   ├── StaffForm.tsx           # Create/edit staff form
│   ├── StaffDetails.tsx        # Staff detail view
│   ├── StaffManagement.tsx     # Main management component
│   └── index.ts                # Component exports
├── hooks/
│   ├── use-staff.ts            # Staff CRUD hooks
│   ├── use-roles.ts            # Role CRUD hooks
│   ├── use-staff-form.ts       # Form handling hooks
│   ├── use-role-form.ts        # Role form hooks
│   ├── use-venue-context.ts    # Venue context hook
│   └── index.ts                # Hook exports
├── services/
│   └── staff.service.ts        # API service layer
├── types/
│   └── index.ts                # TypeScript interfaces
└── README.md                   # This file
```

### **Data Flow:**
1. **Service Layer** - API calls with proper error handling
2. **React Query Hooks** - Data fetching, caching, mutations
3. **Components** - UI presentation with optimistic updates
4. **Toast Notifications** - User feedback for all operations

---

## 🧩 **Components**

### **StaffManagement** (Main Component)
- Orchestrates all staff management functionality
- Handles view state management (list/create/edit/details)
- Coordinates between components

### **StaffList**
- Displays staff members in card format
- Advanced filtering and search capabilities
- Action dropdowns for each staff member
- Pagination-ready design

### **StaffForm**
- Comprehensive form for creating/editing staff
- Validates all input fields with Zod schema
- Handles contract types and availability preferences
- Special handling for minors with legal restrictions

### **StaffDetails**
- Complete staff member profile view
- Overtime management with inline editing
- Self-service access token management
- Employment details and availability preferences

---

## 🔧 **Usage Examples**

### **Basic Usage:**
```tsx
import { StaffManagement } from '@/features/staff/components';

export default function StaffPage() {
  return (
    <div className="container mx-auto p-6">
      <StaffManagement />
    </div>
  );
}
```

### **Individual Components:**
```tsx
import { StaffList, StaffForm, StaffDetails } from '@/features/staff/components';

// Staff listing with custom handlers
<StaffList
  venueId="venue-123"
  onCreateStaff={() => setMode('create')}
  onEditStaff={(staff) => setSelectedStaff(staff)}
  onViewStaff={(staff) => setMode('details')}
/>

// Staff creation form
<StaffForm
  venueId="venue-123"
  onSubmit={handleCreateStaff}
  onCancel={() => setMode('list')}
  isLoading={createMutation.isPending}
/>

// Staff details view
<StaffDetails
  staffId="staff-456"
  venueId="venue-123"
  onEdit={() => setMode('edit')}
  onClose={() => setMode('list')}
/>
```

### **Using Hooks:**
```tsx
import { useStaffByVenue, useCreateStaff } from '@/features/staff/hooks/use-staff';

function MyStaffComponent({ venueId }: { venueId: string }) {
  const { data: staff, isLoading } = useStaffByVenue(venueId);
  const createStaff = useCreateStaff(venueId);

  const handleCreate = (data: CreateStaffRequest) => {
    createStaff.mutate(data, {
      onSuccess: () => console.log('Staff created!'),
      onError: (error) => console.error('Failed:', error),
    });
  };

  return (
    <div>
      {staff?.map(member => (
        <div key={member.id}>{member.fullName}</div>
      ))}
    </div>
  );
}
```

---

## 🎨 **Contract Types**

The system supports various contract types with specific behaviors:

| Contract Type | Default Hours | Description |
|---------------|---------------|-------------|
| `full_time`   | 40/week       | Standard full-time employment |
| `part_time`   | 20/week       | Part-time employment |
| `temporary`   | Variable      | Fixed-term contracts |
| `freelance`   | Variable      | Project-based work |
| `intern`      | 25/week       | Internship programs |
| `contract`    | Variable      | Contract workers |

### **Minor Protection:**
- Maximum 6 hours per day
- Maximum 30 hours per week
- Automatic validation and warnings

---

## 🔒 **Self-Service Access**

Staff members can be granted self-service access to:
- View their schedules
- Submit time-off requests
- Make shift swap requests
- Access their personal information

### **Token Management:**
- Generate secure access tokens
- Set expiration dates
- Revoke access when needed
- Track token status

---

## 📊 **Overtime Management**

Comprehensive overtime tracking system:

- **Annual Limits** - Set maximum overtime hours per year
- **Current Usage** - Track hours used throughout the year
- **Remaining Hours** - Calculate available overtime
- **Manual Adjustments** - Update overtime hours as needed
- **Compliance** - Ensure labor law compliance

---

## 🔍 **Search and Filtering**

Advanced filtering capabilities:

### **Search Options:**
- Name (first/last)
- Email address
- Phone number

### **Filter Options:**
- Role assignment
- Active/inactive status
- Contract type
- Minor status

### **Sorting:**
- Name (A-Z)
- Hire date
- Role
- Status

---

## 🚀 **Getting Started**

1. **Add to your route:**
   ```tsx
   // app/dashboard/staff/page.tsx
   import { StaffManagement } from '@/features/staff/components';
   
   export default function StaffPage() {
     return <StaffManagement />;
   }
   ```

2. **Ensure venue context:**
   The staff management requires a venue context. Make sure your app provides the current venue ID.

3. **Backend API:**
   Ensure your backend implements all the staff endpoints listed above.

---

## 🎯 **Key Features Highlights**

### **🔄 Real-time Updates**
- React Query automatically refetches data
- Optimistic updates for better UX
- Smart cache invalidation

### **📱 Responsive Design**
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Touch-friendly controls

### **♿ Accessibility**
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### **🔔 User Feedback**
- Toast notifications for all operations
- Loading states and error handling
- Confirmation dialogs for destructive actions

### **📊 Data Validation**
- Zod schema validation
- Business rule enforcement
- Italian labor law compliance

---

## 🛠️ **Customization**

### **Extending Contract Types:**
```tsx
// Add new contract type to types/index.ts
export enum ContractType {
  // ... existing types
  SEASONAL = 'seasonal',
}

// Update labels in components
const CONTRACT_TYPE_OPTIONS = [
  // ... existing options
  { value: ContractType.SEASONAL, label: 'Seasonal' },
];
```

### **Custom Validation:**
```tsx
// Extend the staff schema
const customStaffSchema = staffSchema.extend({
  customField: z.string().optional(),
});
```

### **Additional Actions:**
```tsx
// Add custom actions to StaffList dropdown
<DropdownMenuItem onClick={() => handleCustomAction(member.id)}>
  <CustomIcon className="h-4 w-4 mr-2" />
  Custom Action
</DropdownMenuItem>
```

---

🎉 **Your complete staff management system is ready to use!**
