import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Node, Tree } from './data_structure/dataStructure';

import Layout from './hoc/Layout/Layout';
import CreateTab from './containers/CreateTab/CreateTab';
import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.tree = new Tree();
        this.rootNode = new Node('CEO');
        this.tree.root = this.rootNode;
        this.state = { 
            dataStructure: this.tree
        }
    }

    render() {
        this.tree.add('VP of Happiness', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Finance', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Sadness', 'CEO', this.tree.traverseBF);

        this.tree.add('Director of Puppies', 'VP of Finance', this.tree.traverseBF);
        this.tree.add('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);

        this.tree.remove('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);

        console.log(this.tree);
        console.log(this.state);

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
