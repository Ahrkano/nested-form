import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { formObjectRenderingArray } from '../../helper_functions/formObjectRenderingArray';

import InputBox from '../../components/InputBox/InputBox';

import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.rootQuestionsOrder = null;
        this.state = null;
    }

    componentDidMount() {
        this.setState({ ...this.props.formObject });
        this.rootQuestionsOrder = this.props.rootQuestionsOrder;
    }

    onInputChangeHandler = (event, questionId) => {
        const newState = {
            ...this.state,
            [questionId]: {
                ...this.state[questionId],
                answer: event.target.value
            }
        }
        this.setState({ ...newState });
    }

    render() {
        let renderForm = null,
            questionsRenderArray = null;

        if (this.state && this.rootQuestionsOrder) {
            questionsRenderArray = formObjectRenderingArray(this.state, this.rootQuestionsOrder);
    
            renderForm = questionsRenderArray.map(questionId => {
                return (
                    <InputBox key={questionId} 
                        id={questionId}
                        question={this.state[questionId].question}
                        inputType={this.state[questionId].inputType}
                        value={this.state[questionId].answer}
                        level={this.state[questionId].level}
                        onInputChange={this.onInputChangeHandler}
                    />
                );
            });
        }

        const customEnterAnimation = {
            from: { 
                opacity: 0,
                transform: 'translateX(-100%)' 
            },
            to: { 
                opacity: 1,
                transform: 'translateX(0)' 
            }
        };

        const customLeaveAnimation = {
            from: { 
                opacity: 1,
                transform: 'translateX(0)' 
            },
            to: { 
                opacity: 0,
                transform: 'translateX(100%)' 
            }
        };

        return (
            <div className="previewTab">
                <form>
                <FlipMove 
                    duration={350} 
                    easing="ease-out" 
                    enterAnimation={customEnterAnimation}
                    leaveAnimation={customLeaveAnimation}>
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