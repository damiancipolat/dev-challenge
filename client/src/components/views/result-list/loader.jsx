//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Styles
import './result-list.less';

//Rutas de homepage.
class Loader extends Component {

  constructor(props) {
    super(props);
  }

  render() {  

    return (<div className="col-md-9">
              <div className="results-panel center loading">
                  <img src="/img/flybondi_logo.png" className="mini-logo"/>
                  <h3 className="orange">Buscando...</h3>
                  <img src="/img/loader.gif"/>     
              </div>
            </div>);

  }

}

export default Loader;