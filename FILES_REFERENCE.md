# Quick File Reference

## 📋 Complete File Inventory

### Configuration Files (Root)
```
├── package.json                  # NPM dependencies and scripts
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript node configuration
├── tailwind.config.ts           # Tailwind CSS theme customization
├── postcss.config.mjs           # PostCSS configuration
├── .eslintrc.json              # ESLint rules
├── .gitignore                  # Git ignore patterns
├── .env.example                # Environment variables template
├── middleware.ts               # Next.js middleware (auth protection)
├── README.md                   # Main documentation
├── PROJECT_SUMMARY.md          # Project overview & stats
├── DEVELOPMENT.md              # Development guide
└── DEPLOYMENT.md               # Deployment guide
```

### Source Code Structure

#### Pages & Routing (src/app)
```
src/app/
├── layout.tsx                      # Root layout
├── page.tsx                        # Home redirect
├── globals.css                     # Global styles
├── login/
│   └── page.tsx                   # Login page
└── dashboard/
    ├── layout.tsx                 # Dashboard wrapper
    ├── page.tsx                   # Dashboard (bento layout)
    ├── cases/
    │   ├── page.tsx               # Cases list
    │   └── [id]/page.tsx          # Case detail
    ├── documents/page.tsx         # Documents
    ├── calendar/page.tsx          # Calendar
    ├── clients/page.tsx           # Clients
    ├── admin/page.tsx             # Admin panel
    └── profile/page.tsx           # Profile
```

#### Components (src/components)

**UI Components** (Reusable)
```
src/components/ui/
├── Button.tsx                 # Variants: primary, secondary, accent, danger, ghost
├── Card.tsx                   # Card, CardHeader, CardTitle, CardContent
├── Badge.tsx                  # Status badges
├── FormFields.tsx             # Input, Select, TextArea
├── Feedback.tsx               # Tabs, Alert, Modal, Spinner, EmptyState
└── index.ts                   # Exports
```

**Layout Components**
```
src/components/layout/
└── DashboardLayout.tsx        # Main layout with sidebar & header
```

**Auth Components**
```
src/components/auth/
└── LoginPage.tsx
```

**Dashboard Components**
```
src/components/dashboard/
└── DashboardCards.tsx         # Bento grid card components
```

#### Core Modules (src)

**Types** (TypeScript)
```
src/types/
└── index.ts                   # All type definitions
```

**Constants**
```
src/constants/
└── index.ts                   # Colors, courts, roles, statuses, etc.
```

**State Management** (Zustand)
```
src/store/
└── auth.ts                    # Auth store with user state
```

**Services & API**
```
src/services/
└── api.ts                     # API client & service methods
```

**Custom Hooks**
```
src/hooks/
├── useAuth.ts                 # Auth hook with helpers
└── index.ts                   # Exports
```

**Utilities**
```
src/lib/
└── utils.ts                   # cn() className utility
```

## 🔍 File Quick Reference

### When You Need To...

#### Add a New Page
→ Create folder in `src/app/dashboard/` > add `page.tsx`

#### Create a Component
→ Create file in `src/components/[category]/` using UI components

#### Add Form Validation
→ Use `zod` schema + `react-hook-form` + `FormFields` components

#### Call API
→ Import from `src/services/api.ts`

#### Manage Auth
→ Use `useAuth()` hook from `src/hooks/useAuth.ts`

#### Change Colors
→ Edit `tailwind.config.ts` > `colors.legal` object

#### Add Role-based Route
→ Check `user?.role` in `useAuth()` hook

#### Update Constants
→ Edit `src/constants/index.ts`

## 📊 Import Paths

```typescript
// Components
import { Button, Card, Badge } from '@/components/ui'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LoginPage } from '@/components/auth/LoginPage'

// Types
import { Case, User, UserRole, CaseStatus } from '@/types'

// Constants
import { CASE_STATUSES, USER_ROLES, COLORS } from '@/constants'

// Services
import { authService, casesService, documentsService } from '@/services/api'

// Hooks
import { useAuth } from '@/hooks'

// Utils
import { cn } from '@/lib/utils'

// Store
import { useAuthStore } from '@/store/auth'
```

## 🎨 Component Usage Quick Examples

### Button
```typescript
<Button variant="primary" size="md">Login</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="accent" loading>Loading...</Button>
```

### Card
```typescript
<Card>
  <CardHeader>
    <CardTitle>Case Details</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Badge
```typescript
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Closed</Badge>
```

### Tabs
```typescript
<Tabs tabs={[
  { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: '2', label: 'Tab 2', content: <div>Content 2</div> }
]} />
```

### Form
```typescript
<Input label="Name" placeholder="Enter name" />
<Select label="Status" options={CASE_STATUSES} />
<TextArea label="Notes" rows={5} />
```

## 🎯 Common Patterns

### Protected Route
```typescript
const { user, isAuthenticated } = useAuth()
if (!isAuthenticated) return <Redirect to="/login" />
```

### Role Check
```typescript
const { isAdmin, isAdvocate } = useAuth()
if (!isAdmin()) return <AccessDenied />
```

### API Call
```typescript
const [data, setData] = useState(null)
useEffect(() => {
  casesService.getAll().then(r => setData(r.data))
}, [])
```

## 📱 Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🎨 Color Usage

```typescript
// Primary
className="text-legal-navy bg-legal-navy"

// Accent
className="text-legal-gold bg-legal-gold"

// Text
className="text-legal-charcoal"

// Background
className="bg-legal-ivory"

// Alert
className="text-legal-red bg-legal-red"
```

## 📝 Naming Conventions

- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Exports**: PascalCase (`export const UserProfile`)
- **Functions**: camelCase (`getUserData()`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- **Types**: PascalCase (`interface User {}`)

## 🚀 Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production
npm run lint     # ESLint check
```

## ✅ Deployment

```bash
# Vercel
vercel --prod

# Docker
docker build -t legal-cms .
docker run -p 3000:3000 legal-cms

# Traditional
npm run build && npm start
```

## 🔗 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.2.3 | React framework |
| react | ^18.3.1 | UI library |
| tailwindcss | ^3.4.1 | CSS framework |
| zustand | ^4.4.7 | State management |
| date-fns | ^3.0.0 | Date utilities |
| lucide-react | ^0.376.0 | Icons |
| axios | ^1.6.5 | HTTP client |
| zod | ^3.22.4 | Validation |
| react-hook-form | ^7.50.1 | Form handling |

## 🐛 Debugging Tips

- Use browser DevTools
- Check console for errors
- Use Network tab for API
- Use React DevTools extension
- Add `console.log()` statements
- Check environment variables

## ❓ FAQ

**Q: How do I add a new role?**
A: Add to `UserRole` enum in `src/types/index.ts` and `USER_ROLES` in constants

**Q: How do I connect real backend?**
A: Update `NEXT_PUBLIC_API_URL` in `.env.local` and API service methods

**Q: How do I add authentication?**
A: Implement actual login in `LoginPage.tsx` using `authService.login()`

**Q: Where are mock data?**
A: Mock data is defined in page components. Replace with API calls to backend

**Q: How do I deploy?**
A: See `DEPLOYMENT.md` for detailed instructions

---

**For more info, see:**
- README.md - Overview
- DEVELOPMENT.md - Coding guide
- DEPLOYMENT.md - Deployment guide
- PROJECT_SUMMARY.md - Complete project stats
