import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { returnAdditionalRoutes, returnAdditionalRedirections } from './app_services';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';

import './App.css';

export class App extends Component {
    render() {
        let routes = returnAdditionalRoutes(this.props.areInputsFilled),
            additionalRedirections = returnAdditionalRedirections(this.props.areInputsFilled);

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
