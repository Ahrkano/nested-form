import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formObjectFiller, rootQuestionsOrderArray } from '../../shared/formObjectFiller';
import { objectForm, rootQuestionsOrder } from '../../shared/hardCodedObjectForm';


import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.rootQuestionsOrder = null;
        this.state = {}
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
        console.log(this.state);
        console.log(this.rootQuestionsOrder);

        // const questionRecursiveCall = function(questionId) {
        //     console.log(this.state[questionId]);

        // }
        
        // if (this.state) {
            // console.log(this.state);
        //     renderForm = this.rootQuestionsOrder.map(rootQuestion => {
        //         // print rootQuestion
        //         // check if question has condition & print if possible
        //     });
        // }

        return (
            <div className="previewTab">
                <form>{renderForm}</form>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);