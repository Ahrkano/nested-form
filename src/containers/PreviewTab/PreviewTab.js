import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.formObject = null;
    }

    componentWillMount() {
        if (this.props.questionArray) {
            this.formObject = {}
            // populating formObject with questionObjects
            this.props.questionArray.forEach(questionItem => {
                this.formObject[questionItem.id] = {
                    conditionType: questionItem.condition === 'noCondition' ? 'root' : 'conditional',
                    parentId: questionItem.parentId,
                    question: questionItem.question,
                    inputType: questionItem.type,
                    answer: '',
                    conditionalQuestions: {}
                }; 
            });

            // populating rootQuestionsOrder Array
            this.formObject.rootQuestionsOrder = [];

            this.props.questionArray.forEach(questionItem => {
                if(questionItem.parentId === 'rootNode') {
                    this.formObject.rootQuestionsOrder.push(questionItem.id);
                }

                if (questionItem.condition !== 'noCondition') {
                    this.formObject[questionItem.parentId].conditionalQuestions[questionItem.id] = {
                        type: questionItem.condition,
                        value: questionItem.conditionValue
                    };
                }
            });
        }
    }

    render() {
        let formInputs = null;
        console.log(this.formObject);
        console.log(this.props.questionArray);

        return (
            <div className="previewTab">
                <form>
                    {formInputs}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);