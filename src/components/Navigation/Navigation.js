import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 

import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';

import './Navigation.css';
    
class NavigationItems extends Component {
  state = {
    showModal: false
  }

  openModal(event) {
    event.preventDefault();
    console.log('in openModal()');
  }

  render() {
    let links = null;

    if(this.props.areInputsFilled) {
      links = (
        <Aux>
          <li><NavLink to="/Preview">Preview</NavLink></li>
          <li><NavLink to="/Export">Export</NavLink></li>
        </Aux>
      );
    } else {
      links = (
        <Aux>
          <li><NavLink to="/Preview" onClick={this.openModal}>Preview</NavLink></li>
          <li><NavLink to="/Export" onClick={this.openModal}>Export</NavLink></li>
        </Aux>
      );
    }


    return (
      <Aux>
        <nav className="Navigation">
          <ul>
            <li><NavLink to="/Create">Create</NavLink></li>
            {links}
          </ul>
        </nav>
      </Aux>
    );
  }
}

const mapStateToProps = state => { 
  return { 
      areInputsFilled: state.areInputsFilled
  }; 
};

export default connect(mapStateToProps, null)(NavigationItems);