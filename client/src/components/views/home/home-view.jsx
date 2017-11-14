//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Api
import Api  from '../../../service/api.js';

//Incorpo componentes.
import FooterView  from '../footer/footer-home-view.jsx';
import HeaderView  from '../header/header-home-view.jsx';
import PromoView   from '../promotion/promo-home-view.jsx';

//Styles
import './home-view.less';

//Rutas de homepage.
class HomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {departure:[],promos:[]};

  }

  componentWillMount(){

    //Hago el request para obtener los datos de la pantalla.
    Api.getHomeData().then((data)=>{

      this.setState({departure:data.departures, promos:data.recommended});

    });

  }

  render() {  

    return (<div>
              <HeaderView form={this.state.departure}/>
              {(this.state.promos)?<PromoView promotions={this.state.promos}/>:<div className="plane-bg"><img src="/img/plane_bg.jpg"/></div>}
              <div className="label-home">              
                <div>
                  <img src="/img/b_logo.png" className="b-logo"/>
                  <span className="title-home">Low Cost</span>
                </div>
                <div className="descrip-home">
                  Flybondi es la primera aerolínea low cost de la Argentina, basada en una alta eficiencia
                  que nos permite tener los precios más bajos del mercado, y así lograr que 
                  todos podamos volar.Queremos que todos estemos mejor conectados, que tengamos la libertad de viajar en avión y sobretodo,
                  la oportunidad de explorar y conocer más nuestro país, uno de los más lindos del mundo.<br/><br/>
                  Hoy sólo 1 de cada 10 argentinos accede a volar.<br/>
                  Nuestro foco es lograr que en cinco años haya 10 millones de nuevos pasajeros volando con nosotros.
                </div>
                <div className="valores-home">
                  <h3>Nuestros valores</h3>
                  <div className="row">
                    <div className="col-md-2 col-sm-12 valor-box">
                      <div className="valor-box-img">
                        <img src="/img/check.png"/>
                      </div>
                      <span>Eficiencia</span>
                    </div>
                    <div className="col-md-2 col-sm-12 valor-box">
                      <div className="valor-box-img">
                        <img src="/img/hearth.png"/>
                      </div>
                      <span>Humano y humildo</span>
                    </div>
                    <div className="col-md-2 col-sm-12 valor-box">
                      <div className="valor-box-img">
                        <img src="/img/smile.png"/>
                      </div>
                      <span>Alegria</span>
                    </div>
                    <div className="col-md-2 col-sm-12 valor-box">
                      <div className="valor-box-img">
                        <img src="/img/safe.png"/>
                      </div>
                      <span>Seguridad</span>
                    </div>
                  </div>
                </div>
              </div>
              <FooterView/>
            </div>);

  }

}

export default HomeView;