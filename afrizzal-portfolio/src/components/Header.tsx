import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          MyPortfolio
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Beranda</Link></li>
          <li><Link href="/projects" className="hover:text-gray-300">Proyek</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Kontak</Link></li>
        </ul>
      </nav>
    </header>
  );
} 