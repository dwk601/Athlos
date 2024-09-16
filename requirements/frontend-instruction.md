# Project Overview
Use this guide to build a web app where sports enthusiasts can join or create groups, view member profiles, and anonymously rate other users, while keeping individual ratings hidden. The app will allow admins to create games, automatically divide teams based on hidden ratings, and track game attendance with a check-in system. Focus on intuitive navigation, a clean UI, and mobile responsiveness to ensure a smooth user experience. The guide covers essential frontend elements like group creation, rating functionality, game setup, team division logic, and check-in workflows.

# Feature Requirements
- Tech Stack: We will use Typescript, Next.js, Shadcn UI, Kinde Auth, and Supabase
Pages and Features:
- Home/Landing Page
        Purpose: Introduce Athlos, its features, and provide entry points for users to sign up or log in.
        Features:
            Navigation to Kinde Auth login/signup.
            Publicly accessible.

- Dashboard Page
        Purpose: Display recent activities, upcoming games, and ratings visible to the logged-in user.
        Features:
            Show a list of upcoming games.
            Display recent activities, such as games participated in.
            Show the user's ratings that they can only view.
            Link to Group Page and Game Creation Page (if user is a group leader).
            Implement Kinde Auth for user authentication.

- Group Page
        Purpose: Allow users to request to join a group, view group details, games, and members.
        Features:
            Request to join a group via a join button.
            View the list of members (without seeing their ratings).
            View a list of upcoming and past games within the group.
            For group leaders, provide a link to the Game Creation Page.
            Show the upcoming games in a grid view. 

- Game Creation Dialog
        Purpose: Allow group leaders to create new games for their group page.
        Features:
            Create a new game by entering date, time, and location.
            Option to auto-divide teams based on a hidden rating system.
            Invite players from the group to participate.
            Use Supabase to store the game data.

- Game Details Page
        Purpose: Display detailed information about a specific game, including attendees, check-in status, and team assignments.
        Features:
            List of attendees and their check-in status.
            Auto-divided team assignments based on user ratings.
            Option for users to check in for the game.
            Update game status and team assignments in real-time using Supabase.

# Kinde Auth Integration
- Implement Kinde Auth for user authentication.
- Use the Kinde Next.js SDK for seamless integration.
- Replace the Sign-up/Login Page with Kinde Auth components.
- Ensure proper redirection after successful authentication.

# Supabase Integration
- Use Supabase for database operations and real-time updates.
- Implement Supabase client for data fetching and mutations.
- Ensure proper error handling and loading states when interacting with Supabase.

# Relevant docs
[Kinde Next.js SDK Documentation](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)

# Current File Structure for Athlos project
ATHLOS/
├── .next/
├── .vscode/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [kindeAuth]/
│   │           └── route.js
│   ├── dashboard/
│   ├── page.tsx
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
├── components/
│   ├── ui/
│   │   ├── auth-buttons.tsx
│   │   ├── footer.tsx
│   │   └── header.tsx
├── lib/
│   ├── utils.ts
│   └── node_modules/
├── requirements/
│   ├── backend-instruction.md
│   └── frontend-instruction.md
├── utils/
│   └── supabase/
│       └── client.ts
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── mockup.png
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json


# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified 
- All new pages go in /app
- Implement Kinde Auth components for login/signup functionality
- Use Supabase for all database operations