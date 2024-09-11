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

- Game Creation Page
        Purpose: Allow group leaders to create new games for their group.
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
Supabase tables and relationship
+------------------------+            +------------------------+
|        users           |            |        groups          |
+------------------------+            +------------------------+
| PK | id (UUID)          |<---------- | PK | id (UUID)          |
|    | email (TEXT)      |            |    | group_name (TEXT)  |
|    | password (TEXT)   |            |    | description (TEXT) |
|    | name (TEXT)       |            | FK | leader_id (UUID)  |
|    | is_group_leader   |            |    | created_at         |
|    | created_at        |            +------------------------+
+------------------------+
           ^ 1
           |
           | N
+------------------------+
|      user_groups       |
+------------------------+
| PK | id (UUID)          |
| FK | user_id (UUID)     |
| FK | group_id (UUID)    |
|    | status (TEXT)      |
|    | joined_at          |
+------------------------+

+------------------------+            +------------------------+
|         games          |            |     game_attendees     |
+------------------------+            +------------------------+
| PK | id (UUID)          |            | PK | id (UUID)          |
| FK | group_id (UUID)    |<---------- | FK | game_id (UUID)    |
|    | game_datetime      |            | FK | user_id (UUID)    |
|    | location (TEXT)    |            |    | check_in_status    |
| FK | created_by (UUID)  |            |    | checked_in_at      |
|    | created_at         |            |    | team_assignment    |
+------------------------+            +------------------------+

+------------------------+
|        ratings         |
+------------------------+
| PK | id (UUID)          |
| FK | game_id (UUID)     |
| FK | rater_id (UUID)    |
| FK | rated_user_id (UUID)|
|    | rating (INTEGER)   |
|    | created_at         |
+------------------------+


# Current File Structure 
ATHLOS/
├── app/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       └── skeleton.tsx
├── lib/
│   └── utils.ts
├── requirements/
│   └── frontend-instruction.md
├── .eslintrc.json
├── .gitignore
├── components.json
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