# Legal CMS Frontend

A professional Legal Case Management System built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

- **Bento Layout Dashboard** - Modern grid-based interface with statistics and quick actions
- **CNR Auto-Date Fetch** - Automated hearing date retrieval for Patna and Barh courts
- **PDF Viewer** - Document viewing interface for legal documents
- **Client Portal** - Client directory with search and management capabilities
- **RBAC Security** - Role-based access control (Admin, Lawyer, Client, Staff)
- **Professional Design** - Navy (#001F3F), Gold (#C5A021), and Charcoal color theme

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Demo Login

Use any email and password to login and explore the system.

## 📸 Screenshots

- Login page with professional branding
- Dashboard with Bento layout and statistics
- Case search with CNR auto-date fetch
- Case details with PDF viewer
- Client portal with RBAC

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **Fonts:** Montserrat, Inter

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard and sub-pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Login page
├── components/ui/         # Reusable UI components
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## 📝 Documentation

See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for detailed implementation notes.

## 🎓 User Journey

```
Login → Dashboard → Case Search → Case Details → PDF Viewer → Client Portal → Logout
```

## 📄 License

ISC
