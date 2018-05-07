import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import { enterAnimation, leaveAnimation } from './AnimationsSettings/animationsSettings';
import { returnFormJSX } from './Services/services';

import './PreviewTab.css';

class PreviewTab extends Component {
    constructor() {
        super();
        this.state = null;
    }

    componentDidMount() {
        this.setState({ ...this.props.formObject });
    }

    onInputChangeHandler = (event, questionId) => {
        const newState = {
            ...this.state,
            [questionId]: {
                ...this.state[questionId],
                answer: event.target.value
            }
        };
        this.setState({ ...newState });
    };

    render() {
        let renderForm = returnFormJSX(
            this.state,
            this.props.rootQuestionsOrder,
            this.onInputChangeHandler
        );

        return (
            <div className="previewTab">
                <form>
                    <FlipMove
                        duration={350}
                        easing="ease-out"
                        enterAnimation={enterAnimation}
                        leaveAnimation={leaveAnimation}
                    >
                        {renderForm}
                    </FlipMove>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rootQuestionsOrder: state.rootQuestionsOrder,
        formObject: state.formObject
    };
};

export default connect(mapStateToProps, null)(PreviewTab);
