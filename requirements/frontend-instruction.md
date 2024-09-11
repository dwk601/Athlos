# Project Overview
Use this guide to build a web app where sports enthusiasts can join or create groups, view member profiles, and anonymously rate other users, while keeping individual ratings hidden. The app will allow admins to create games, automatically divide teams based on hidden ratings, and track game attendance with a check-in system. Focus on intuitive navigation, a clean UI, and mobile responsiveness to ensure a smooth user experience. The guide covers essential frontend elements like group creation, rating functionality, game setup, team division logic, and check-in workflows.

# Feature Requirements
- Tech Stack: We will use Typescript, Next.js, Shadcn UI, and Supabase
Pages and Features:
- Home/Landing Page
        Purpose: Introduce Athlos, its features, and provide entry points for users to sign up or log in.
        Features:
            Navigation to Sign-up/Login Page.
            Publicly accessible.

- Sign-up/Login Page
        Purpose: Allow users to register a new account or log in with existing credentials.
        Features:
            Email/password sign-up and login using Supabase Authentication.
            Social login options (Google, Facebook) via Supabase.
            Redirect to Dashboard after login/signup.

- Dashboard Page
        Purpose: Display recent activities, upcoming games, and ratings visible to the logged-in user.
        Features:
            Show a list of upcoming games.
            Display recent activities, such as games participated in.
            Show the user's ratings that they can only view.
            Link to Group Page and Game Creation Page (if user is a group leader).

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
            Update game status and team assignments in real-time using Supabase

# Relevant docs
Supabase backed tables created
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    is_group_leader BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS groups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_name TEXT NOT NULL,
    description TEXT,
    leader_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS user_groups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'approved')) DEFAULT 'pending',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, group_id)
);


CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    game_datetime TIMESTAMP WITH TIME ZONE NOT NULL, -- Combines date and time
    location TEXT NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS game_attendees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    check_in_status BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    team_assignment INTEGER,
    UNIQUE (game_id, user_id)
);


CREATE TABLE IF NOT EXISTS ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (game_id, rater_id, rated_user_id)
);

CREATE INDEX IF NOT EXISTS idx_rating ON ratings (game_id, rated_user_id);

# Current File Structure 
ATHLOS/
├── .next/
├── .vscode/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── fonts/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── footer.tsx
│       └── header.tsx
├── lib/
│   └── utils.ts
├── node_modules/
├── requirements/
│   ├── backend-instruction.md
│   └── frontend-instruction.md
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── mockup.png
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.ts
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified 
- All new pages go in /app