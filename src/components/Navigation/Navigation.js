import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 

import Aux from '../../hoc/Auxiliary/Auxiliary';
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

    let links = null,
        modalHeading = null,
        modalMessage = null;

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
      if (this.props.emptyInputsLeft > 1) {
        modalHeading = `There are ${this.props.emptyInputsLeft} inputs left empty`;
      } else {
        modalHeading = `There is ${this.props.emptyInputsLeft} input left empty`;
      }
      
      modalMessage = 'Please fill all inputs before continuing';
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
          heading={modalHeading}
          info={modalMessage} />
      </Aux>
    );
  }
}

const mapStateToProps = state => { 
  return { 
      areInputsFilled: state.areInputsFilled,
      emptyInputsLeft: state.emptyInputs
  }; 
};

export default connect(mapStateToProps, null)(NavigationItems);