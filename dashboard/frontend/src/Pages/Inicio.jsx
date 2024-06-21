import Header from "../components/Header";
import Contenido from "../components/Contenido";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../Firebase/config"

export default function Inicio() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name');
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Cierra la sesión del usuario utilizando Firebase
      await auth.signOut();
      // Redirige al usuario a la página de inicio de sesión
      navigate('/')
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        userName={userName}
        onLogout={handleLogout}
      />

      {/* Header y Contenido */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Contenido Principal */}
        <Contenido
          userName={userName}
        />
      </div>
    </div>
  );
}
