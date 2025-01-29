import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-gray-900">
      <h1 className="text-7xl font-bold text-green-400">404</h1>
      <p className="text-xl mt-4">Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
