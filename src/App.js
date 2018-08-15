import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Layout from './components/Layout'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Route path="/" component={Layout}></Route>
      </Router>
    );
  }
}

export default App

