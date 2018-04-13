import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import { Node, Tree } from './data_structure/dataStructure';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.tree = new Tree();
    this.rootNode = new Node('CEO');
    this.tree.root = this.rootNode;
    this.state = {

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


    return (
      <div className="App">
        <h1>nested form starter files</h1>
      </div>
    );
  }
}

export default App;
