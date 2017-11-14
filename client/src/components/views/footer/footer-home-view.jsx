//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Styles
import './footer-home-view.less';

//Rutas de homepage.
class FooterView extends Component {

  constructor(props) {
    super(props);
  }

  render() {  

    return (<div className="footer-div">
              <div className="center">
                <div className="row">
                  <div className="col-md-4">
                    <img src="/img/qr-data.png"/>
                  </div>
                  <div className="col-md-8">
                    <div className="row copyright">
                      <img src="/img/social.png"/>
                      <div>Flybondi®  2017</div>
                    </div>
                  </div>                  
                </div>
              </div>              
            </div>);

  }

}

export default FooterView;