import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Combination from './components/combination'
import Home from './components/home/home'
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator'

class App extends React.Component {
  render(){
    return (
      <Router>
        <LoadingIndicator/>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Room/:token" component={Combination} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;