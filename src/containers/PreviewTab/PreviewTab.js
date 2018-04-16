import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formObjectFiller } from '../../shared/formObjectFiller';

import './PreviewTab.css';
    
class PreviewTab extends Component {
    constructor() {
        super();
        this.formObject = null;
    }

    componentWillMount() {
        this.formObject = formObjectFiller(this.props.questionArray);
    }

    render() {
        let renderForm = null;
        
        if (this.formObject) {
            
        }

        return (
            <div className="previewTab">
                <form>
                    {renderForm}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

export default connect(mapStateToProps, null)(PreviewTab);