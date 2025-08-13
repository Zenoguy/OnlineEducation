# ClassSync - Modern Online Learning Platform

A comprehensive online learning platform built with Next.js, featuring AI-powered video search, real-time note sharing, and comprehensive homework management.

## 🚀 Features

### Core Functionality
- **Role-based Authentication**: Teacher and Student roles with OAuth support
- **Class Management**: Create, join, and manage classes with invite codes
- **Note Sharing**: Real-time note sharing with rich text editor
- **Video Integration**: YouTube/Udemy video embedding with AI transcription
- **Homework Tracking**: Assignment creation, submission, and deadline management
- **AI-Powered Search**: Semantic search in video transcripts

### Design & UX
- **Glassmorphism Design**: Modern frosted-glass UI elements
- **Dark/Light Mode**: Persistent theme switching
- **Fully Responsive**: Mobile-first design with desktop optimization
- **Smooth Animations**: Micro-interactions and transitions
- **Accessible**: WCAG compliant interface

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Supabase Auth (placeholder)
- **Database**: Supabase PostgreSQL with pgvector (placeholder)
- **AI Integration**: OpenAI Whisper + Embeddings (placeholder)
- **Real-time**: Supabase Realtime (placeholder)
- **File Storage**: Supabase Storage (placeholder)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── classes/           # Class management
│   ├── notes/             # Note sharing
│   ├── homework/          # Assignment management
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── navbar.tsx        # Navigation bar
│   ├── sidebar.tsx       # Side navigation
│   └── theme-toggle.tsx  # Dark mode toggle
├── hooks/                # Custom React hooks
│   └── use-auth.tsx      # Authentication hook
├── utils/                # Utility functions
│   ├── api-client.ts     # API client
│   └── date-formatter.ts # Date utilities
├── config/               # Configuration files
│   └── constants.ts      # App constants
└── lib/                  # Shared utilities
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ClassSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   
   # OpenAI Configuration
   OPENAI_API_KEY=your-openai-api-key
   
   # Authentication
   JWT_SECRET=your-jwt-secret
   
   # App Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration Placeholders

### Supabase Setup
1. Create a new Supabase project
2. Set up the database schema (see `docs/database-schema.sql`)
3. Enable Row Level Security (RLS)
4. Configure authentication providers
5. Update environment variables

### OpenAI Integration
1. Get an OpenAI API key
2. Implement video transcription:
   ```typescript
   // In utils/api-client.ts
   async transcribeVideo(videoUrl: string) {
     // Integrate with OpenAI Whisper API
     // Extract audio from video
     // Send to Whisper for transcription
     // Store transcript in database
   }
   ```

3. Implement embedding generation:
   ```typescript
   // Generate embeddings for search
   async generateEmbeddings(text: string) {
     // Use OpenAI text-embedding-ada-002
     // Store in Supabase pgvector
   }
   ```

### Real-time Features
```typescript
// Implement real-time note sharing
const notesChannel = supabase
  .channel('notes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'notes'
  }, (payload) => {
    // Update UI with real-time changes
  });
```

## 📱 Responsive Design

The platform is built with a mobile-first approach:

- **Mobile (<768px)**: Single-column layout with collapsible navigation
- **Tablet (768px-1024px)**: Grid layouts with adaptive components
- **Desktop (>1024px)**: Full sidebar with multi-column layouts

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Teal (#14B8A6)
- Accent: Orange (#F97316)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Font: Inter
- Line Heights: 150% body, 120% headings
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Base unit: 8px
- Consistent spacing system using Tailwind classes

## 🔐 Security Features

- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control
- **File Upload**: Type and size validation
- **Input Validation**: Client and server-side validation
- **CORS**: Configured for production deployment

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with zero configuration

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET=your-secure-jwt-secret
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

### Class Management
- `GET /api/classes` - List user's classes
- `POST /api/classes` - Create new class
- `POST /api/classes/join` - Join class with code
- `GET /api/classes/:id` - Get class details

### Notes
- `GET /api/notes` - List notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Homework
- `GET /api/homework` - List assignments
- `POST /api/homework` - Create assignment
- `POST /api/homework/:id/submit` - Submit homework

### AI Features
- `POST /api/transcribe` - Transcribe video
- `POST /api/search/transcripts` - Search transcripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@ClassSync.com
- Documentation: [docs.ClassSync.com](docs.ClassSync.com)
- Issues: GitHub Issues

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui# OnlineEducation
