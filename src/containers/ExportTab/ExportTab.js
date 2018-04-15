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

const mapStateToProps = state => { return { data: state.questionsArray }; };

export default connect(mapStateToProps, null)(ExportTab);