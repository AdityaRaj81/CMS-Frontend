# Development Guide

## 🚀 Getting Started

### 1. Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` and login with:
- Email: `admin@cms.com`
- Password: `password123`

### 2. Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components
│   ├── auth/        # Auth components
│   └── dashboard/   # Dashboard-specific
├── types/           # TypeScript definitions
├── constants/       # App constants
├── store/           # State management (Zustand)
├── services/        # API services
├── hooks/           # Custom hooks
└── lib/             # Utilities
```

## 🎯 Common Tasks

### Creating a New Page

1. Create folder in `src/app/dashboard/[page-name]/`
2. Create `page.tsx`:

```typescript
'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function NewPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-legal-navy">Page Title</h1>
      {/* Content here */}
    </div>
  )
}
```

### Creating a New Component

Place in `src/components/[category]/ComponentName.tsx`:

```typescript
'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  children: React.ReactNode
  className?: string
}

export const ComponentName: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  )
}
```

### Using the Auth Store

```typescript
'use client'

import { useAuth } from '@/hooks'

export const MyComponent = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth()

  if (!isAuthenticated) return null

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      {isAdmin() && <p>You are an admin</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Calling API

```typescript
import { casesService } from '@/services/api'

// Get all cases
const getCases = async () => {
  try {
    const response = await casesService.getAll({ page: 1, limit: 25 })
    console.log(response.data)
  } catch (error) {
    console.error('Failed to fetch cases', error)
  }
}

// Create case
const createCase = async (caseData) => {
  try {
    const response = await casesService.create(caseData)
    return response.data
  } catch (error) {
    console.error('Failed to create case', error)
  }
}
```

### Using Form Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Button } from '@/components/ui'

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
})

type FormData = z.infer<typeof formSchema>

export const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  )
}
```

## 🎨 Styling Guide

### Using Tailwind Classes

```typescript
// Use legal color theme
className="bg-legal-navy text-legal-ivory border-legal-gold"

// Use provided component utilities
className="btn-primary card sidebar-link"
```

### Custom Colors Reference

```
text-legal-navy          #0B1F3A
text-legal-gold          #C8A951
text-legal-charcoal      #2B2E34
bg-legal-ivory           #F7F5EF
text-legal-red           #8B1E1E
```

### Component Style Patterns

```typescript
// Card with hover effect
<Card hover className="p-6">
  Content
</Card>

// Button variants
<Button variant="primary" size="md">Primary</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="accent" size="lg">Accent</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Badge variants
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

## 🔒 Role-Based Rendering

```typescript
import { useAuth } from '@/hooks'

export const AdminOnly = () => {
  const { isAdmin } = useAuth()

  if (!isAdmin()) return null

  return <div>Only visible to admins</div>
}

// Or with specific roles
export const RoleCheck = () => {
  const { hasRole } = useAuth()

  if (!hasRole(['admin', 'advocate'])) return null

  return <div>Visible to admins and advocates</div>
}
```

## 📡 API Integration

### Add New Service

Edit `src/services/api.ts`:

```typescript
export const newService = {
  getAll: (params?: any) => apiClient.get('/endpoint', { params }),
  getById: (id: string) => apiClient.get(`/endpoint/${id}`),
  create: (data: any) => apiClient.post('/endpoint', data),
  update: (id: string, data: any) => apiClient.put(`/endpoint/${id}`, data),
  delete: (id: string) => apiClient.delete(`/endpoint/${id}`),
}
```

### Update API Base URL

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🧪 Testing

### Run ESLint
```bash
npm run lint
```

### Build
```bash
npm run build
```

### Production Start
```bash
npm start
```

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension
- Redux DevTools (Zustand store)
- Network tab for API calls

### Logging

```typescript
// In components
console.log('Debug:', variable)

// In API service
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response)
    return response
  }
)
```

## 📚 Component Examples

### Modal Usage
```typescript
import { Modal, Button } from '@/components/ui'
import { useState } from 'react'

export const ModalExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        isOpen={open}
        title="Modal Title"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary">Save</Button>
          </>
        }
      >
        Modal content here
      </Modal>
    </>
  )
}
```

### Tabs Usage
```typescript
<Tabs tabs={[
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content 2</div>
  }
]} />
```

### Alert Usage
```typescript
<Alert
  type="success"
  title="Success"
  message="Operation completed"
  onClose={() =>  setAlert(false)}
/>
```

## 🚀 Performance Tips

1. **Use Next.js Image Component**
   ```typescript
   import Image from 'next/image'
   ```

2. **Lazy Load Components**
   ```typescript
   import dynamic from 'next/dynamic'
   const HeavyComponent = dynamic(() => import('./Heavy'))
   ```

3. **Optimize Re-renders**
   - Use `React.memo()` for presentation components
   - Use `useMemo()` and `useCallback()` judiciously

4. **Code Splitting**
   - Next.js automatically code-splits at page level

## 📝 Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserData()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH = 100`)
- **Types**: PascalCase (`interface UserData {}`)
- **Files**: kebab-case for pages (`user-profile/page.tsx`)

## ✅ Code Quality

- Use TypeScript strict mode
- Write self-documenting code
- Add comments for complex logic
- Keep components under 300 lines
- Extract reusable logic to custom hooks

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 📞 Support

For issues, check:
1. Console for error messages
2. Network tab for API errors
3. GitHub issues (if public repo)

---

Happy coding! 🚀
