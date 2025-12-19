# TNPlots - Land Marketplace Platform

A comprehensive, mobile-first web platform for discovering and buying verified land plots in Cheyyar, Tamil Nadu.

## 🚀 Features

- **Verified Listings**: 100% verified plot listings with document verification
- **WhatsApp Integration**: Instant seller contact via WhatsApp
- **Mobile-First Design**: Optimized for mobile users on 3G networks
- **Admin Dashboard**: Complete plot management and verification system
- **Tamil Language Support**: Bilingual interface (Tamil/English)  
- **Progressive Web App**: Add-to-home-screen capability
- **SEO Optimized**: Server-side rendering for excellent search visibility

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Image Management**: Cloudinary
- **Authentication**: Custom admin authentication
- **Maps**: Google Maps API
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (for image hosting)
- Google Maps API key
- npm or yarn

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd TNPlots
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Admin Access

Default admin credentials:
- **Phone**: 9876543210
- **Password**: admin123

Access admin panel at: `/admin`

## 🗄️ Database Schema

Key models:
- **User**: Sellers and admins
- **Plot**: Land plot listings
- **PlotImage**: Plot images via Cloudinary  
- **VerificationLog**: Verification history
- **Inquiry**: WhatsApp/phone inquiry tracking
- **AdminLog**: Audit trail for admin actions

## 🎨 Project Structure

```
TNPlots/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public pages
│   │   ├── page.tsx       # Homepage
│   │   ├── plots/         # Plot listings & details
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout components
│   └── plot/             # Plot-specific components
├── lib/                  # Utility libraries
│   ├── prisma.ts        # Prisma client
│   ├── utils.ts         # Formatters, helpers
│   ├── whatsapp.ts      # WhatsApp integration
│   └── cloudinary.ts    # Image upload service
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma migrate dev  # Create migration
npx prisma db seed   # Seed database

# Linting
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

### Environment Variables for Production

Ensure all environment variables are configured in your hosting platform:
- Database connection string (production PostgreSQL)
- Cloudinary credentials
- Google Maps API key
- NextAuth secret (generate new for production)

## 🔐 Security Notes

- Change default admin password in production
- Use strong `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- Implement proper session management (currently basic for development)
- Enable Prisma row-level security if using Supabase
- Validate all user inputs on API routes

## 📈 Performance Optimization

- Images automatically optimized via Cloudinary
- Server-side rendering for fast initial loads
- Lazy loading for below-fold images
- Code splitting by route
- PWA caching for offline support

## 🌍 Tamil Language Support

The platform includes bilingual support:
- UI elements translated to Tamil
- Plot titles and descriptions in both languages
- Tamil number formatting (Lakhs, Crores)
- Tamil font: Noto Sans Tamil

## 📞 WhatsApp Integration

Pre-filled WhatsApp messages include:
- Plot ID and title
- Price and location
- Available in Tamil and English
- Tracks inquiry analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary.

## 📧 Support

For support, email info@tnplots.com or call +91 98765 43210.

## 🎯 Roadmap

- [ ] WhatsApp Business API integration
- [ ] Seller self-registration portal
- [ ] Featured listing monetization
- [ ] Mobile app (React Native)
- [ ] Expansion to nearby regions

---

**Built with ❤️ for Cheyyar, Tamil Nadu**
# Vercel rebuild Thu Dec 18 23:06:53 EST 2025
