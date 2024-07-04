import React from 'react';

export default function Inicio() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold text-white mb-8">¡Bienvenidos a Cinemiramar!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <img src="https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg" alt="Experiencia Cinematográfica" className="mb-4 rounded" />
          <h2 className="text-2xl font-semibold mb-4 text-white">Experiencia Cinematográfica</h2>
          <p className="text-lg text-white">
            Disfruta de la mejor calidad de imagen y sonido en nuestras salas de cine.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <img src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg" alt="Variedad de Películas" className="mb-4 rounded" />
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
    </div>
  );
}
