import React from 'react';

const productos = [
  {
    id: 1,
    titulo: 'Camiseta El Padrino',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Camiseta oficial de la película El Padrino.'
  },
  {
    id: 2,
    titulo: 'Taza Star Wars',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Taza con diseño de Star Wars para los fans de la saga.'
  },
  {
    id: 3,
    titulo: 'Figura de Batman',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Figura coleccionable de Batman.'
  },
  {
    id: 4,
    titulo: 'Poster Harry Potter',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Poster de la saga Harry Potter.'
  },
  {
    id: 5,
    titulo: 'Libro El Señor de los Anillos',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Libro de El Señor de los Anillos en edición especial.'
  },
  {
    id: 6,
    titulo: 'Funko Pop! Avengers',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Figura Funko Pop! de los Avengers.'
  },
  {
    id: 7,
    titulo: 'Puzzle Jurassic Park',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Puzzle de la película Jurassic Park.'
  },
  {
    id: 8,
    titulo: 'Llavero Spider-Man',
    imagen: 'https://via.placeholder.com/300x300',
    descripcion: 'Llavero con diseño de Spider-Man.'
  }
];

export default function Merchandising() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Productos de Películas</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {productos.map(producto => (
          <div key={producto.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              src={producto.imagen}
              alt={producto.titulo}
              className="mb-2 rounded"
              style={{ width: '100%', height: 'auto' }}
            />
            <h2 className="text-xl font-semibold mb-2 text-white">{producto.titulo}</h2>
            <p className="text-white">{producto.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
