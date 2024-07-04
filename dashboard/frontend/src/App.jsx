import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Inicio from './Pages/Inicio';
import Peliculas from './Pages/Peliculas';
import Merchandising from './Pages/Merchandising';
import Product from './Pages/Product';
import Layout from './components/Layout'; // Asegúrate de importar el Layout

// Importaciones de estilo
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './flags.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/merchandising" element={<Merchandising />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// return (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route element={<Layout />}>
//         <Route path="/inicio" element={<Inicio />} />
//         <Route path="/peliculas" element={<Peliculas />} />
//         <Route path="/merchandising" element={<Merchandising />} />
//         <Route path="/product" element={<Product />} />
//       </Route>
//     </Routes>
//   </Router>
// );