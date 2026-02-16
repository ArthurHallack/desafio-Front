import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Material from './pages/Material';
import Dashboard from './pages/DashBoard';

import Sidebar from './components/SideBar';

import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* Botão para abrir o menu */}
      <header>
        <button 
        style={{
          marginLeft: '-2.5rem',
          
        }}
        onClick={() => setMenuOpen(true)}>☰</button>
      </header>

      <Sidebar isOpen={menuOpen} setIsOpen={setMenuOpen} />

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/Material" element={<Material />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App