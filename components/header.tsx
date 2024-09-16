import Link from "next/link";

import dynamic from 'next/dynamic';

const AuthButtons = dynamic(() => import('./auth-buttons'), { ssr: false });

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Athlos
        </Link>
        <nav>
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}
