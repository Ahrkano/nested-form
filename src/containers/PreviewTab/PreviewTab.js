import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formObjectFiller, rootQuestionsOrderArray } from '../../helper_functions/formObjectFiller';
import { formObjectRenderingArray } from '../../helper_functions/formObjectRenderingArray';
import { objectForm, rootQuestionsOrder } from '../../shared/hardCodedObjectForm';


import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.rootQuestionsOrder = null;
        this.state = null;
    }

    componentWillMount() {
        // const formObject = formObjectFiller(this.props.questionArray);
        // this.setState({ ...formObject });
        // this.rootQuestionsOrder = rootQuestionsOrderArray(this.props.questionArray);

        // hard coded values
        this.rootQuestionsOrder = rootQuestionsOrder;
        this.setState({ ...objectForm });
    }

    render() {
        let renderForm = null,
            questionsRenderArray = null;

        if (this.state && this.rootQuestionsOrder) {
            questionsRenderArray = formObjectRenderingArray(this.state, this.rootQuestionsOrder);
            console.log(questionsRenderArray);
        }


        // start 
        // const questionsRenderArray = [];
        
        /*
        if (this.state && this.rootQuestionsOrder) {

            const that = this;

            const questionRecursiveCall = function(questionId) {
                const parentId = that.state[questionId].parentId;
                
                if (that.state[questionId].parentId === 'rootNode') {
                    questionsRenderArray.push(questionId);
                }
                
                if(that.state[questionId].parentId !== 'rootNode') {
                    const parent = that.state[parentId];
                    const conditionalValue = that.state[parentId].conditionalQuestions[questionId].value; 
                    
                    if (parent.answer.toLowerCase() === conditionalValue.toLowerCase()) {
                        questionsRenderArray.push(questionId);
                    }
                    
                    // test logs
                    console.table({
                        parent: parentId,
                        parentAnswer: parent.answer,
                        conditionalQuestionId: questionId,
                        conditionalAnswer: conditionalValue
                    });
                }
    
                if (Object.keys(that.state[questionId].conditionalQuestions)[0]) {
                    for(let key in that.state[questionId].conditionalQuestions) {
                        questionRecursiveCall(key);
                    }
                }
            }

            setTimeout(() => console.log(this.state), 0);
            setTimeout(() => console.log(questionsRenderArray), 0);

            this.rootQuestionsOrder.map(rootQuestion => {
                questionRecursiveCall(rootQuestion);
            });
        }

        //  end

        */

        return (
            <div className="previewTab">
                <form>{renderForm}</form>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);