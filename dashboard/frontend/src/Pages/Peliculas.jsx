import React from 'react';

export default function Peliculas() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Cinemiramar</h1>
      <p className="text-lg mb-4">
        Disfruta de la mejor experiencia cinematográfica con Cinemiramar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Película Destacada</h2>
          <img
            src="https://m.media-amazon.com/images/I/71c05lTE03L._AC_SL1200_.jpg"
            alt="Película Destacada"
            className="mb-2 rounded"
          />
          <p>Descripción de la película destacada.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Próximos Estrenos</h2>
          <img
            src="https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg"
            alt="Próximos Estrenos"
            className="mb-2 rounded"
          />
          <p>Lista de próximos estrenos.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Promociones</h2>
          <img
            src="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg"
            alt="Promociones"
            className="mb-2 rounded"
          />
          <p>Información sobre promociones actuales.</p>
        </div>
      </div>
    </div>
  );
}
