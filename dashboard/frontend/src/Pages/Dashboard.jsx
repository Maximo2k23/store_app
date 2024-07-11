import React from 'react'; 
import { Menu } from 'primereact/menu';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
//import { useRouter } from 'next/router';

function Dashboard() {
  // const router = useRouter();
    const items = [
        {
            label: 'Router Link',
            icon: 'pi pi-palette',
            template: ()=>{
              return (<NavLink to="/inicio">Home</NavLink>)
            }
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            url: '/unstyled'
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            url: '/unstyled'
        }
    ];

  return (
    <>
    <Menu model={items} />
    <div>
    <Routes>
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
    </div>
    </>
  );
}

export default Dashboard;