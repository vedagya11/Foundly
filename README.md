# Foundly

## Tagline
Talent Deserves to Be Found.

## About
Foundly is an AI-enabled social platform where people showcase what they can do, while AI converts their content into skill-based insights that help the right opportunities find them.

Today, visibility and talent are not necessarily the same thing. Creators with raw talent often get buried behind follower algorithms and industry connections. Foundly bridges this gap by adding an AI-assisted skill evaluation layer under a social community platform, allowing opportunity providers to discover creators based on demonstrated skill metrics.

---

## Prototype Features
- **Creator Social & Community Feed**: Share audio sessions, UI/UX design showcases, and code repositories with full social interaction (Likes, Comments, Shares, Follows).
- **Creator Profiles**: Comprehensive portfolio showcasing location, follower stats, work samples, and a cumulative AI Skill Graph tracking long-term growth.
- **AI-Assisted Skill Evaluation**: Interactive upload simulator evaluating 5 category-specific parameters (e.g. Pitch Accuracy, Voice Quality, Visual Composition, Code Efficiency).
- **Overall AI Skill Score & Badges**: Calculated overall score cards alongside qualitative strength and improvement insights.
- **Skill-Based Talent Discovery**: Opportunity Provider search matrix allowing recruiters to filter creators by minimum skill score thresholds.
- **Anonymous / Stealth Discovery Mode**: Verified opportunity providers can browse talent invisibly with an interactive identity reveal workflow upon active outreach.
- **Shortlisting**: Workspace to save and track candidate shortlists.
- **Inquiry & Direct Contact Flow**: Dedicated contact composer modal for sending project opportunities.
- **2-Pane Messaging System**: Modern 2-pane chat interface with conversation threads and real-time message stream.
- **Role-Based Experience Switcher**: Seamless local prototype switching between Creator View and Opportunity Provider View.

---

## Technology
- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tooling**: [Vite 5](https://vitejs.dev/)
- **Icon Library**: [Lucide React](https://lucide.dev/)
- **Styling**: Custom CSS System with Glassmorphism tokens, CSS Variables, and Google Fonts (`Outfit` & `Plus Jakarta Sans`)
- **Hosting & Deployment**: [Vercel](https://vercel.com/) with single-page application route rewrites

---

## Current Stage
**Functional Web Prototype / Idea Validation**

---

## Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/foundly.git
   cd foundly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## Deployment

This application is configured for one-click deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the `foundly` project in Vercel.
3. Vercel automatically detects Vite and builds using `npm run build` with the output directory `dist`.
4. The included `vercel.json` ensures SPA route rewrites work seamlessly without 404 errors on route refresh.

---

## Important Prototype Note
> **Notice**: This web application is a functional prototype designed for product concept validation and user experience demonstration. AI evaluation scores, candidate matching algorithms, direct messaging threads, and role switches currently use simulated local mock datasets (`src/data/mockData.js`). Production AI model inference, live database persistence, and user authentication infrastructure would be integrated in future release phases.
