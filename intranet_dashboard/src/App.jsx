import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Product from './pages/Product';
import Inventory from './pages/Inventory';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route exact path='/'>
            <Redirect to="/intranet" />
          </Route> */}
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Product />} />
            <Route path='/dashboard/product' element={<Product />} />
            <Route path='/dashboard/inventory' element={<Inventory />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}