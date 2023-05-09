import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container p-2">
        <Link className="navbar-brand" to='/'>NGEDATE.id</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/place">cari tempat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">tentang</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
