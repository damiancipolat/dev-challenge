//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Componentes
import FormSearch  from '../search-form/search-form-view.jsx';

//Styles
import './header-home-view.less';

//Rutas de homepage.
class HeaderHomeView extends Component {

  constructor(props) {
    super(props);
  }

  render() {  
console.log('prop',this.props.form);
    return (<div className="header">
              <div className="logos">
                <figure className="logo">
                  <img src="/img/flybondi_logo.png"/>
                </figure>
                <figure className="lowcost">
                  <img src="/img/primera.png"/>
                </figure>
              </div>
              <FormSearch depature={this.props.form}/>
            </div>);

  }

}

export default HeaderHomeView;