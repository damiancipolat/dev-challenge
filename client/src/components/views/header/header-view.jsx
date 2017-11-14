//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Componentes
import FormSearch  from '../search-form/search-form-view.jsx';
import Header      from '../header/header-view.jsx';

//Styles
import './header-view.less';

//Rutas de homepage.
class HeaderHomeView extends Component {

  constructor(props) {
    super(props);
  }

  render() {  

    return (<div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <img src="/img/flybondi_logo_white.png"/>
                  </div>
                </div>
              </nav>
            </div>);

  }

}

export default HeaderHomeView;