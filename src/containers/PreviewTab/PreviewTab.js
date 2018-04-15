import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreviewTab.css';
    
class PreviewTab extends Component {

    render() {
        console.log(this.props.questionArray);
        return (
            <div className="previewTab">
                <h1>Preview Tab</h1>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);