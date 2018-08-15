import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import { Provider,connect } from 'react-redux'
import Layout from './components/Layout'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    const { store } = this.props
    return (
      <Router>
        <Provider store={store}>
          <Route path="/" component={Layout}></Route>
        </Provider>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {routecss:state.routecss}
}

export default connect(mapStateToProps)(App)

