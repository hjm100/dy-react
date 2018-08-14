import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router/router.config'
class App extends Component {
  render() {
    return (
      <Router> 
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </Router> 
    );
  }
}

export default App;



