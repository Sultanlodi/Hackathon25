# Stacks - AI-Powered Financial Literacy Platform

Stacks is a revolutionary financial literacy platform that combines AI coaching, blockchain transparency, and gamified rewards to make building wealth engaging and sustainable. Designed for Gen Z and young professionals, Stacks transforms traditional financial education into an interactive, personalized experience.

## 🎯 Purpose & Mission

**Making wealth accessible to everyone through technology.**

Traditional financial education is broken - it's boring, one-size-fits-all, and disconnected from real behavior change. Stacks bridges this gap by:

- **Personalizing** financial advice through AI coaching
- **Gamifying** wealth-building with blockchain-verified rewards
- **Democratizing** access to sophisticated financial tools
- **Educating** users through interactive, engaging experiences

### Key Problems We Solve

- 📚 **Financial literacy gap** among young adults
- 🎯 **Lack of personalized financial guidance**
- 💰 **Difficulty maintaining savings habits**
- 🏦 **Barriers to investment and wealth building**
- 🤖 **Need for 24/7 financial coaching**

## ✨ Core Features

### 🤖 AI Financial Coach

- **Personalized insights** based on spending patterns
- **24/7 availability** for financial questions and guidance
- **Smart budget analysis** with optimization recommendations
- **Investment suggestions** tailored to risk tolerance
- **Goal achievement tracking** with actionable steps

### 🏦 Secure Bank Integration

- **Plaid integration** for secure account linking
- **Real-time transaction** monitoring and categorization
- **Bank-level encryption** and security standards
- **Multi-account support** across different institutions

### 🎯 Smart Goal Setting

- **SMART goals** framework with blockchain backing
- **Milestone tracking** with progress visualization
- **Automated savings** recommendations
- **Goal commitment** through smart contracts

### 🪙 Tokenized Rewards System

- **STX tokens** earned for financial milestones
- **Blockchain transparency** for all rewards
- **Gamified experience** making saving fun
- **Real value** tokens with future redemption options

### 📊 Comprehensive Dashboard

- **Financial overview** with real-time data
- **Budget tracking** and spending analysis
- **Investment portfolio** monitoring
- **Goal progress** visualization

### 💡 Educational Content

- **Interactive tutorials** on financial concepts
- **Personalized learning** paths based on goals
- **Market insights** and investment education
- **Best practices** for wealth building

## 🏗️ Technology Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **UI Components:** Radix UI + Custom Components
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** React Hooks + Zustand (implied)

### Backend & Database

- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API Routes:** Next.js API Routes
- **Real-time:** Supabase Realtime

### Integrations

- **Banking:** Plaid API
- **AI:** Google Generative AI (@google/generative-ai)
- **Blockchain:** Polygon Network (for STX tokens)
- **Payments:** Stripe (future implementation)

### Development Tools

- **Package Manager:** pnpm
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript
- **Deployment:** Vercel (recommended)

## 🏛️ Architecture Overview

### Database Schema

```
Users (Supabase Auth)
├── Profiles (user metadata)
├── Bank Connections (Plaid integration)
├── Financial Accounts
├── Transactions
├── Budget Categories
├── Goals & Milestones
├── Reward Tokens
└── AI Chat Messages
```

### API Structure

```
/api/
├── auth/           # Authentication endpoints
├── bank/           # Plaid integration
├── budget/         # Budget management
├── goals/          # Goal setting and tracking
├── transactions/   # Transaction management
├── ai/             # AI coach interactions
├── wallet/         # Token management
└── rewards/        # Reward system
```

### Component Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main application
│   ├── budget/            # Budget management
│   ├── goals/             # Goal setting
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── auth/              # Authentication components
│   ├── budget/            # Budget components
│   ├── goals/             # Goal components
│   ├── ai-coach/          # AI chat interface
│   └── rewards/           # Reward system components
└── lib/
    ├── supabase.ts        # Database client
    ├── plaid.ts           # Banking integration
    ├── store.ts           # State management
    └── events.ts          # Event tracking
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account and project
- Plaid developer account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sultanlodi/Hackathon25.git
   cd Hackathon25
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # Plaid
   PLAID_CLIENT_ID=your-plaid-client-id
   PLAID_SECRET=your-plaid-secret
   PLAID_ENV=sandbox

   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key
   ```

4. **Set up Supabase database**
   - Follow the complete setup guide in `SUPABASE_SETUP.md`
   - Run the provided SQL schema in your Supabase dashboard

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Hackathon25/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── budget/        # Budget management
│   │   ├── goals/         # Goal setting
│   │   ├── login/         # Authentication
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── auth/          # Auth components
│   │   ├── budget/        # Budget components
│   │   ├── goals/         # Goal components
│   │   ├── ai-coach/      # AI chat components
│   │   └── rewards/       # Reward components
│   └── lib/               # Utilities and configs
│       ├── supabase.ts    # Database client
│       ├── plaid.ts       # Banking API
│       ├── store.ts       # State management
│       └── events.ts      # Analytics
├── .env.local             # Environment variables
├── SUPABASE_SETUP.md      # Database setup guide
├── package.json           # Dependencies
├── tailwind.config.js     # Styling config
└── tsconfig.json          # TypeScript config
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm type-check` - Run TypeScript checks
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🔐 Security & Privacy

- **Bank-level encryption** for all financial data
- **Row Level Security (RLS)** in Supabase
- **No data selling** - your information stays private
- **FDIC-insured** partner institutions
- **Compliance** with financial regulations

## 🌟 Key Differentiators

1. **AI-First Approach**: Personalized coaching available 24/7
2. **Blockchain Transparency**: All rewards and goals verified on-chain
3. **Gamification**: Making financial literacy engaging and fun
4. **Real Integration**: Live bank data and actual investment options
5. **Education Focus**: Teaching rather than just tracking
6. **Gen Z Optimized**: Modern UI/UX designed for digital natives

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
