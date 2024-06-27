import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className="bg-orange-500 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Cinemiramar</div>
        <div className="space-x-4">
          <Link to="/inicio" className="text-white hover:text-gray-200">Inicio</Link>
          <Link to="/peliculas" className="text-white hover:text-gray-200">Películas</Link>
          <Link to="/merchandising" className="text-white hover:text-gray-200">Merchandising</Link>
        </div>
      </nav>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        {/* El Outlet renderizará las rutas secundarias */}
        <Outlet />
      </div>
    </>
  );
}
