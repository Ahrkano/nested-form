import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Aux from './hoc/Auxiliary/Auxiliary';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';
import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {

    render() {
        let routes = null,
            additionalRedirections = null;

        if(this.props.areInputsFilled) {
            routes = (
                <Aux>
                    <Route path="/Preview" component={PreviewTab} />
                    <Route path="/Export" component={ExportTab} />
                </Aux>
            );
        }

        if(!this.props.areInputsFilled) {
            additionalRedirections = (
                <Aux>
                    <Redirect from="/Preview" to="/Create" />
                    <Redirect from="/Export" to="/Create" />
                </Aux>
            );
        }
        
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/Create" component={CreateTab} />
                        {routes}
                        <Redirect from="/" to="/Create" />
                        {additionalRedirections}
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return { 
        areInputsFilled: state.areInputsFilled
    }; 
};

export default withRouter(connect(mapStateToProps, null)(App));