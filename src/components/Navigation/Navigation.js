import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import ModalBox from '../ModalBox/ModalBox';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

import './Navigation.css';

class NavigationItems extends Component {
    state = {
        showModal: false
    };

    openModal = event => {
        event.preventDefault();
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        let links = null,
            modalHeading = null,
            modalMessage = null;

        if (this.props.areInputsFilled) {
            links = (
                <Aux>
                    <li>
                        <NavLink to="/Preview">Preview</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Export">Export</NavLink>
                    </li>
                </Aux>
            );
        } else {
            links = (
                <Aux>
                    <li>
                        <NavLink to="/Preview" onClick={this.openModal}>
                            Preview
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Export" onClick={this.openModal}>
                            Export
                        </NavLink>
                    </li>
                </Aux>
            );

            if (this.props.emptyInputsLeft > 1) {
                modalHeading = `There are ${this.props.emptyInputsLeft} inputs left empty`;
                modalMessage = 'Please fill in all inputs before continuing';
            } else if (this.props.emptyInputsLeft === 1) {
                modalHeading = `There is ${this.props.emptyInputsLeft} input left empty`;
                modalMessage = 'Please fill in all inputs before continuing';
            } else {
                modalHeading = `You don't have any inputs yet`;
                modalMessage = 'Please create and fill in all inputs before continuing';
            }
        }

        return (
            <div>
                <nav className="Navigation">
                    <ul>
                        <li>
                            <NavLink to="/Create">Create</NavLink>
                        </li>
                        {links}
                    </ul>
                    <h1 class="Navigation__title">
                        <strong>Nested Form</strong> Creator
                    </h1>
                </nav>
                <Transition in={this.state.showModal} timeout={500} mountOnEnter unmountOnExit>
                    {state => (
                        <ModalBox
                            state={state}
                            close={this.closeModal}
                            heading={modalHeading}
                            info={modalMessage}
                        />
                    )}
                </Transition>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        areInputsFilled: state.areInputsFilled,
        emptyInputsLeft: state.emptyInputs
    };
};

export default withRouter(connect(mapStateToProps, null)(NavigationItems));
