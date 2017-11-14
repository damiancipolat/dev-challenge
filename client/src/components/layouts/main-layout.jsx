//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Componentes
import FooterView  from '../views/footer-home.jsx';

//Styles
import './main-layout.less';

//Rutas de homepage.
class MainLayout extends Component {

  constructor(props) {
    super(props);
  }

  render() {  

    let content = this.props.children;

    return (<div>
              {FooterView}
            </div>);

  }

}

export default MainLayout;




/*

<img src="/img/flybondi_logo.png" className="logo"/>
                <img src="/img/primera.png"       className="lowcost"/>


<div className="form-search">
                <div className="form-body">
                  <div className="form-snippet">
                    <div className="btn-snippet">Basico</div>
                    <div className="btn-snippet">Avanzada</div>
                  </div>
                  <div>
                    asdasdasdsadasdsa
                  </div>
                </div>
              </div>

*/



/*
              <div className="row full">
                  <div className="col-lg-12 col-md-12 opa">
                    col-sm-8
                  </div>
                  <div className="col-sm-4">col-sm-4</div>
              </div>
*/