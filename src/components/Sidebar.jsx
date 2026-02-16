import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css';

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        <nav className="sidebar-links">
          <Link to="/" onClick={() => setIsOpen(false)}>Produtos</Link>
          <Link to="/Material" onClick={() => setIsOpen(false)}>Materiais</Link>
          <Link to="/Dashboard" onClick={() => setIsOpen(false)}>DashBoard</Link>
        </nav>
      </div>
    </>
  );
}