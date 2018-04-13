import React from 'react';
import { NavLink } from 'react-router-dom'; 

import './Navigation.css';
    
const navigationItems = (props) => {

    return (
        <nav className="Navigation">
          <ul>
            <li><NavLink to="/Create">Create</NavLink></li>
            <li><NavLink to="/Preview">Preview</NavLink></li>
            <li><NavLink to="/Export">Export</NavLink></li>
          </ul>
        </nav>
    );
}

export default navigationItems;