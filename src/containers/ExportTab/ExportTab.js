import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ExportTab.css';
    
class ExportTab extends Component {
    render() {
        return (
            <div className="ExportTab">
                <h1>Export Tab</h1>
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