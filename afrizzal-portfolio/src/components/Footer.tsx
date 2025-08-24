export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {currentYear} Nama Anda. All rights reserved.
      </div>
    </footer>
  );
} 