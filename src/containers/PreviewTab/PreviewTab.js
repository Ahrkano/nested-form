import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formObjectRenderingArray } from '../../helper_functions/formObjectRenderingArray';
import { objectForm, rootQuestionsOrder } from '../../helper_functions/hardCodedObjectForm';

import InputBox from '../../components/InputBox/InputBox';

import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.rootQuestionsOrder = null;
        this.state = null;
    }

    componentWillMount() {
        this.setState({ ...this.props.formObject });
        this.rootQuestionsOrder = this.props.rootQuestionsOrder;
    }

    onInputChangeHandler(event, questionId) {
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
        console.log(this.state);
        let renderForm = null,
            questionsRenderArray = null;

        if (this.state && this.rootQuestionsOrder) {
            questionsRenderArray = formObjectRenderingArray(this.state, this.rootQuestionsOrder);
    
            renderForm = questionsRenderArray.map(questionId => {
                // console.log(this.state[questionId].answer);
                return (
                    <InputBox key={questionId} 
                        id={questionId}
                        question={this.state[questionId].question}
                        inputType={this.state[questionId].inputType}
                        value={this.state[questionId].answer}
                        level={this.state[questionId].level}
                        onInputChange={this.onInputChangeHandler.bind(this)}
                    />
                );
            });
        }

        return (
            <div className="previewTab">
                <form>{renderForm}</form>
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return { 
        allQuestionsOrder: state.allQuestionsOrder,
        rootQuestionsOrder: state.rootQuestionsOrder,
        formObject: state.formObject 
    }; 
};

export default connect(mapStateToProps, null)(PreviewTab);