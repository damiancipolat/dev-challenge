// Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

import HomeView     from '../views/home/home-view.jsx';
import ResultsView  from '../views/results/results-view.jsx';

// Componente principal de manejo de rutas
class MainRouter extends Component {

  constructor(props){
    super(props);
  }

  render() {

   return (
      <Router history = {browserHistory}>
        <Switch>
            <Route exact path = '/' component = {()=><HomeView/>}/>
            <Route path = '/search/:price/:destiny' component = {(route)=><ResultsView route={route}/>}/>
        </Switch>
      </Router>);

  }

}

export default MainRouter;