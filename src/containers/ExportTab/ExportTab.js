import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ExportTab.css';

class ExportTab extends Component {
    constructor() {
        super();
        this.JSONexport = null;
    }
    componentWillMount() {
        this.JSONexport = JSON.stringify({
            formObject: this.props.formObject,
            allQuestionsOrder: this.props.allQuestionsOrder,
            rootQuestionsOrder: this.props.rootQuestionsOrder
        }, null, 2);
    }

    render() {
        return (
            <div className="ExportTab">
                <textarea rows="30" cols="120">
                    {this.JSONexport}
                </textarea>
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

export default connect(mapStateToProps, null)(ExportTab);