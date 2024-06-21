import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Inicio from './Pages/Inicio';
import Product from './Pages/Product';
//import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './flags.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/inicio' element={<Inicio />}/>
        <Route path='/product' element={<Product />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
