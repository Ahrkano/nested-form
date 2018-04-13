import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';
import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';

import './App.css';

class App extends Component {
    
    render() {
        
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

export default App;
