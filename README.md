# Bookmark 📚

A social learning platform that helps you track your learning journey, connect with curious minds, and discover new knowledge together.

## 🌟 Features

### 📖 Learning Management
- **Curriculum Builder**: Create and organize your personal learning curriculum
- **Progress Tracking**: Track your progress through books, courses, articles, and videos
- **Book Integration**: Import book metadata from Goodreads and Open Library APIs
- **Smart Categories**: Organize learning items by topics, tags, and status

### 👥 Social Features
- **Follow System**: Connect with other learners and follow their progress
- **Activity Feed**: Share updates, reviews, and recommendations
- **Comments & Discussions**: Engage in meaningful conversations
- **Reactions**: Like and react to posts and achievements

### 📊 Analytics & Insights
- **Progress Dashboard**: Visualize your learning stats and streaks
- **Reading Analytics**: Track pages read, completion rates, and learning velocity
- **Achievement System**: Celebrate milestones and completed goals

### 💬 Real-Time Communication
- **Direct Messaging**: Chat with other learners
- **Notifications**: Stay updated on follows, comments, and mentions
- **Real-Time Updates**: See activity as it happens

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) + React Chart.js 2
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (Email, Google, Apple)
- **Storage**: Supabase Storage (Avatars, Book Covers)
- **Real-Time**: Supabase Realtime
- **API**: RESTful API with Next.js Route Handlers

### External APIs
- **Books**: Goodreads API, Open Library API
- **Social**: Twitter/X API (for sharing)
- **RSS**: Custom RSS feed parser

### Deployment & Infrastructure
- **Hosting**: [Vercel](https://vercel.com/)
- **Database**: Supabase Cloud
- **CDN**: Vercel Edge Network
- **Analytics**: Plausible / Umami (privacy-focused)

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm** or **yarn**
- **Supabase Account** (free tier works)
- **Vercel Account** (optional, for deployment)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/bitquan/Bookmark_beta.git
cd Bookmark_beta
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional APIs
GOODREADS_API_KEY=your_goodreads_key
```

4. **Set up the database**

- Go to [Supabase Dashboard](https://app.supabase.com)
- Create a new project
- Go to SQL Editor
- Copy and paste the schema from `docs/database-schema.sql`
- Run the migration

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📂 Project Structure

```
bookmark_beta/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── curriculum/        # Curriculum-related components
│   │   ├── feed/              # Feed and social components
│   │   └── chat/              # Chat components
│   ├── lib/                   # Utilities and helpers
│   │   ├── supabase/          # Supabase clients
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Utility functions
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
│   ├── database-schema.sql
│   ├── SETUP-GUIDE.md
│   └── ARCHITECTURE.md
└── package.json
```

---

## 🗄️ Database Schema

The database consists of the following main tables:

- **profiles**: User profiles (extends Supabase Auth)
- **books**: Book metadata from external APIs
- **curriculum_items**: User's learning items
- **progress**: Progress tracking for each item
- **follows**: Social graph (follower/following)
- **posts**: User posts and updates
- **comments**: Comments on posts
- **likes**: Likes on posts and comments
- **messages**: Direct messages
- **notifications**: User notifications

For the complete schema, see [`docs/database-schema.sql`](docs/database-schema.sql).

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel: `vercel`
3. Add environment variables in Vercel Dashboard
4. Every push to `main` will automatically deploy

---

## 📊 Development Roadmap

### Phase 1: Foundation ✅
- Project setup (Next.js + TypeScript + Tailwind)
- Supabase integration
- Database schema design
- Authentication system

### Phase 2: Core Features 🚧
- Curriculum builder
- Book API integration
- Progress tracking

### Phase 3: Social Features 📋
- Follow system
- Activity feed
- Comments & likes
- Real-time chat

### Phase 4: Polish & Launch 🎯
- UI/UX polish
- Testing
- Production deployment

See [GitHub Issues](https://github.com/bitquan/Bookmark_beta/issues) for detailed tasks.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vercel](https://vercel.com/) for seamless deployment

---

## 📧 Contact

**Project Maintainer**: [@bitquan](https://github.com/bitquan)

**Project Link**: [https://github.com/bitquan/Bookmark_beta](https://github.com/bitquan/Bookmark_beta)

---

**Built with ❤️ by learners, for learners.