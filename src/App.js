import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Layout from './components/Layout'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    // 在app.js中可以通过这种方法来设置store
    // console.log(this.props.store.getState())
    return (
      <Router>
        <Route path="/" component={Layout}></Route>
      </Router>
    );
  }
}

export default App

