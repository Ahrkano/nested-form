import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';
import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {

    render() {
        console.log(this.props.areSomeInputsEmpty);
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/Create" component={CreateTab} />
                        <Route path="/Preview" component={PreviewTab} />
                        <Route path="/Export" component={ExportTab} />
                        <Redirect from="/" to="/Create" />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return { 
        areSomeInputsEmpty: state.areSomeInputsEmpty
    }; 
};

export default withRouter(connect(mapStateToProps, null)(App));