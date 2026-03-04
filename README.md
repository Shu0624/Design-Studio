# Studio Arc — Architecture & Interior Design Studio


We built this platform to showcase our architecture and interior design work in a clean, premium, and performance-focused way. The goal wasn’t just to create a portfolio — it was to build something production-ready, scalable, and easy to manage internally.

The stack is modern, fast, and practical: Next.js, TypeScript, Tailwind CSS v4, MongoDB, and Cloudinary.

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

### Backend
- Next.js API Routes
- MongoDB Atlas (Mongoose ODM)

### Authentication
- JWT (stored in httpOnly cookies)
- bcrypt for password hashing

### Media & Assets
- Cloudinary (image uploads + CDN delivery)
- next/font (Inter + Playfair Display)

## 🚀 Getting Started

### Prerequisites

Before running the project locally, make sure you have:
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (free tier works fine)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Now open `.env.local` and replace the placeholder values with your actual credentials.

Example:
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Studio Arc
ADMIN_EMAIL=11.59designstudio@gmail.com
ADMIN_PASSWORD=your-secure-password
```

### 3. Run Development Server
```bash
npm run dev
```

Visit:
[http://localhost:3000](http://localhost:3000)

## 🔐 Initial Admin Setup

We built a custom admin dashboard to manage projects, services, and client messages.

To create the first admin:
1. Make sure the dev server is running.
2. Send a `POST` request to: `/api/seed`
3. Log in at: `/admin/login`

**Default credentials:**
- You define these in your `.env.local` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Only use `/api/seed` locally or immediately after your first production deployment.

⚠️ **Change your password immediately after first login if you deployed with simple credentials.**

## 📂 Project Structure

Here’s how the project is organized:

```text
src/
├── app/
│   ├── page.tsx
│   ├── projects/
│   ├── services/
│   ├── about/
│   ├── contact/
│   ├── admin/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── messages/
│   │   └── login/
│   └── api/
│       ├── auth/login/
│       ├── projects/
│       ├── services/
│       ├── messages/
│       ├── upload/
│       └── seed/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── services/
│   ├── contact/
│   └── admin/
├── models/
├── lib/
└── types/
```

We tried to keep everything modular and easy to extend.

## ✨ Features

### Public Website
- Clean, animated hero section
- Filterable projects portfolio
- Project detail pages with image galleries + lightbox
- Services breakdown with 4-step workflow
- About page with studio philosophy
- Fully validated contact form
- Dynamic SEO metadata per page

### Admin Dashboard
- Secure JWT-based authentication
- Full CRUD for projects
- Multi-image upload to Cloudinary
- Service management with ordering
- Client message viewer (mark as read / delete)

### SEO & Performance
- Dynamic OpenGraph metadata
- JSON-LD structured data (LocalBusiness schema)
- Auto-generated `sitemap.xml`
- Optimized Next.js Image usage
- Self-hosted fonts via `next/font`

### Security Measures
- Password hashing using bcrypt
- Input validation via Zod
- Contact form rate limiting (5 per hour per IP)
- Middleware-protected admin routes

## 📦 Deployment

The project is optimized for deployment on Vercel.

**Build the project:**
```bash
npm run build
```

Then:
1. Push to GitHub
2. Import into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
```
