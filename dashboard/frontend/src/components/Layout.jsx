import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name');
  
  return (
    <>
      <nav className="bg-orange-500 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Cinemiramar</div>
        <div className="space-x-4 flex items-center">
          <Link to={`/?name=${encodeURIComponent(userName || '')}`} className="text-white hover:text-gray-200">Inicio</Link>
          <Link to={`/peliculas?name=${encodeURIComponent(userName || '')}`} className="text-white hover:text-gray-200">Películas</Link>
          <Link to={`/merchandising?name=${encodeURIComponent(userName || '')}`} className="text-white hover:text-gray-200">Merchandising</Link>
          {userName ? (
            <button className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded ml-4">{userName}</button>
          ) : (
            <Link to="/login" className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded ml-4">Login</Link>
          )}
        </div>
      </nav>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        {/* El Outlet renderizará las rutas secundarias */}
        <Outlet />
      </div>
    </>
  );
}
