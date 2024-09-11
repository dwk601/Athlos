# Athlos - Soccer Team Management Web App

Athlos is a web application designed to streamline the management of soccer games and teams. Built with modern technologies, it aims to solve common issues faced by soccer enthusiasts who organize regular games.

## Features

- **Team Member Management**: Easily add, remove, and update team members.
- **Check-in System**: Track player attendance for each game.
- **Rating System**: Implement a fair team division based on player ratings.
- **Upcoming Games**: View and manage scheduled matches.
- **Recent Activities**: Keep track of past games and player performances.

## Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend & Authentication**: Supabase

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/dwk601/athlos
   ```

2. Install dependencies:
   ```
   cd athlos
   npm install
   ```

3. Set up Supabase:
   - Create a Supabase project
   - Copy your Supabase URL and anon key
   - Create a `.env.local` file in the root directory and add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Contains the main pages and routing logic
- `components/`: Reusable React components
- `lib/`: Utility functions and custom hooks
- `public/`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.