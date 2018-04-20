import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/Auxiliary/Auxiliary';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';
import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';

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
                    <Redirect from="/Preview" exact to="/Create" />
                    <Redirect from="/Export" exact to="/Create" />
                </Aux>
            );
        }
        
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/Create" component={CreateTab} />
                        {routes}
                        {additionalRedirections}
                        <Redirect from="/" to="/Create" />
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