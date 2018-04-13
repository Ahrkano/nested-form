import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreviewTab.css';
    
class PreviewTab extends Component {

    render() {
        return (
            <div className="previewTab">
                <h1>Preview Tab</h1>
            </div>
        );
    }
}

const mapStateToProps = state => { return { data: state.dataStructure }; };

export default connect(mapStateToProps, null)(PreviewTab);