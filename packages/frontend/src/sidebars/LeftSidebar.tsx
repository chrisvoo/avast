import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link className="brand-link" to="/">
        <span className="brand-text font-weight-light">Avast Homework</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="nav-icon fas fa-home" />
                <p>
                  Home
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/albums">
                <i className="nav-icon fas fa-cogs" />
                <p>
                  By Album
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
