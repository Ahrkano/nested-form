import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 

import Aux from '../../hoc/Auxiliary/Auxiliary';
// import Modal from '../../../node_modules/react-overlays/lib/Modal';
import ModalBox from '../ModalBox/ModalBox';
import { connect } from 'react-redux';

import './Navigation.css';
    
class NavigationItems extends Component {
  state = {
    showModal: false
  }

  openModal(event) {
    event.preventDefault();
    this.setState({ showModal: true });
    console.log('in openModal()');
  }

  closeModal() {
    this.setState({ showModal: false });
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
          <li><NavLink to="/Preview" onClick={this.openModal.bind(this)}>Preview</NavLink></li>
          <li><NavLink to="/Export" onClick={this.openModal.bind(this)}>Export</NavLink></li>
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
        <ModalBox 
          showModal={this.state.showModal}  
          close={this.closeModal.bind(this)}
          heading="You have some inputs to fill"
          info="bla bla bla" />
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