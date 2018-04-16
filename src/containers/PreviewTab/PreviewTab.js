import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formObjectFiller, rootQuestionsOrderArray } from '../../shared/formObjectFiller';
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
        let renderForm = null;
        const questionsRenderArray = [];
        
        if (this.state && this.rootQuestionsOrder) {

            const that = this;

            const questionRecursiveCall = function(questionId) {
                questionsRenderArray.push(questionId);
                const parentId = that.state[questionId].parentId;
                

                console.log(`questionId: ${questionId}`);
                if(that.state[questionId].parentId !== 'rootNode') {
                    const parentAnswer = that.state[parentId].answer;
                    console.log(`parent ${parentId} answer: ${parentAnswer}`);
                }
                console.log('------------------------');
    
                if (Object.keys(that.state[questionId].conditionalQuestions)[0]) {
                    for(let key in that.state[questionId].conditionalQuestions) {
                        questionRecursiveCall(key);
                    }
                }
            }

            console.log(this.state);

            renderForm = this.rootQuestionsOrder.map(rootQuestion => {
                questionRecursiveCall(rootQuestion);
            });
        }

        return (
            <div className="previewTab">
                <form>{renderForm}</form>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);