import { useNavigate } from "react-router-dom";

export default function Sidebar({ userName, onLogout }) {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/product?name=${userName}`; 
    navigate(path);
  }
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen">
          <div className="p-4">
            {/* Título */}
            <h2 className="text-lg font-bold mb-4">Dashboard</h2>
            
            {/* Nombre del Usuario */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white">{userName ? userName.charAt(0).toUpperCase() : ''}</span>
              </div>
              <span>{userName}</span>
            </div>
            
            {/* Botón Cerrar Sesión */}
            <button onClick={routeChange} className="bg-red-500 text-white py-2 px-4 rounded">Product</button>
            <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
          </div>
        </aside>
      );
};

