import React from 'react';

export default function Inicio() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold text-white mb-8">¡Bienvenidos a Cinemiramar!</h1>
      <p className="text-xl text-white mb-8">
        La mejor experiencia cinematográfica a tu alcance. Disfruta de nuestras salas de última generación, una gran variedad de películas y servicios exclusivos.
      </p>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgHES3eYoLdSaTwyUMfSMmD1oQBcw6pIfXA&s" alt="Experiencia Cinematográfica" className="mb-4 rounded" />
          <h2 className="text-2xl font-semibold mb-4 text-white">Experiencia Cinematográfica</h2>
          <p className="text-lg text-white">
            Disfruta de la mejor calidad de imagen y sonido en nuestras salas de cine.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <img src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVsaWN1bGFzfGVufDB8fDB8fHww" alt="Variedad de Películas" className="mb-4 rounded" />
          <h2 className="text-2xl font-semibold mb-4 text-white">Variedad de Películas</h2>
          <p className="text-lg text-white">
            Ofrecemos una amplia selección de películas para todos los gustos.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <img src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg" alt="Comodidad y Conveniencia" className="mb-4 rounded" />
          <h2 className="text-2xl font-semibold mb-4 text-white">Comodidad y Conveniencia</h2>
          <p className="text-lg text-white">
            Facilidad de acceso, horarios flexibles y servicios adicionales.
          </p>
        </div>
      </div>
  
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-white mb-6">Próximos Estrenos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://pics.filmaffinity.com/Deadpool_y_Lobezno-864471588-large.jpg" alt="Estreno 1" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Estreno 1</h3>
            <p className="text-lg text-white">Descripción breve del estreno 1.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9786125060877.jpg" alt="Estreno 2" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Estreno 2</h3>
            <p className="text-lg text-white">Descripción breve del estreno 2.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://palomaynacho-1f321.kxcdn.com/wp-content/uploads/2024/01/despicable-me-4-scaled.webp" alt="Estreno 3" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Estreno 3</h3>
            <p className="text-lg text-white">Descripción breve del estreno 3.</p>
          </div>
        </div>
      </div>
  
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-white mb-6">Servicios Exclusivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://images.pexels.com/photos/7234475/pexels-photo-7234475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Servicio de Comida y Bebida" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Servicio de Comida y Bebida</h3>
            <p className="text-lg text-white">Disfruta de una gran variedad de snacks y bebidas mientras ves tu película.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg" alt="Salas VIP" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Salas VIP</h3>
            <p className="text-lg text-white">Experimenta el lujo y la comodidad en nuestras exclusivas salas VIP.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg" alt="Proyecciones Especiales" className="mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Proyecciones Especiales</h3>
            <p className="text-lg text-white">Participa en eventos y proyecciones especiales para toda la familia.</p>
          </div>
        </div>
      </div>
    </div>
  );
  
}
