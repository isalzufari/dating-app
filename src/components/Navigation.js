import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ authUser, signOut }) => {
  const location = useLocation();
  const namePlace = location.pathname.split('/');
  const slug = namePlace[1];

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container p-2">
        <Link className="navbar-brand" to='/'>NGEDATE.id</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${slug === 'place' && 'active'}`} aria-current="page" to="/place">cari spot</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${slug === 'about' && 'active'}`} to="/about">tentang</Link>
            </li>
          </ul>

          {!authUser ? <div className="text-end">
            <Link to="app/login" type="button" className="btn btn-primary">sign-in</Link>
          </div> :
            <>
              <div className="flex-shrink-0 dropdown">
                <a href="#/" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>{authUser.name}</span>
                </a>
                <ul className="dropdown-menu text-small shadow">
                  <li><Link className="dropdown-item" to="/app">App</Link></li>
                  <li><a className="dropdown-item" href="#/">Settings</a></li>
                  <li><a className="dropdown-item" href="#/">Profile</a></li>
                  <li><Link className="dropdown-item" to="/app/reviews">Reviews</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a onClick={signOut} className="dropdown-item" href="#/">Sign out</a></li>
                </ul>
              </div>
              {/* <button onClick={signOut} className='btn btn-outline-primary'><i class="bi bi-box-arrow-right"></i></button> */}
            </>
          }

        </div>
      </div>
    </nav>
  )
}

export default Navigation;
