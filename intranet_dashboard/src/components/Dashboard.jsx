import { Outlet, Link } from 'react-router-dom';
import '../index.css'

export default function Dashboard() {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/dashboard/product" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Producto</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard/inventory" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Inventario</Link>
              </li>
              {/* <li className="mb-2">
                <Link to="/vista1" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Vista 1</Link>
              </li>
              <li>
                <Link to="/vista2" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Vista 2</Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
