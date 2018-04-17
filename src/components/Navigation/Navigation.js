import React from 'react';
import { NavLink } from 'react-router-dom'; 

import Aux from '../../hoc/Auxiliary/Auxiliary';

import './Navigation.css';
    
const navigationItems = (props) => {

    return (
      <Aux>
        <nav className="Navigation">
          <ul>
            <li><NavLink to="/Create">Create</NavLink></li>
            <li><NavLink to="/Preview">Preview</NavLink></li>
            <li><NavLink to="/Export">Export</NavLink></li>
          </ul>
        </nav>
      </Aux>
    );
}

export default navigationItems;