//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Styles
import './promo-home-view.less';

//Rutas de homepage.
class PromoHomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {promotions:[]};
  }

  componentWillReceiveProps(props){

    if (props!=null)
      this.setState({promotions:props.promotions});
    
  }

  render() {  

    return (<div className="promo-div">
              <div>                
                <h3>
                  <img src="/img/plane_up.png"/>&nbsp;
                  Ofertas de Vuelos
                </h3>
                <span>
                  Estos son nuestros destinos recomendados en cada una de nuestras 13 rutas aereas.
                </span>
              </div>
              {/*Cuadro de promociones*/}
              <div  className="row promo-grid">
                {/*Promocion*/}
                {this.state.promotions.map((promo,i)=>
                (
                  <div className="col-md-2 promo-card" key={i}>
                    <div className="destiny">{promo.ida.destination.iata}</div>
                    <div className="price">$ {Math.round(promo.price)}</div>
                    <img src={"/img/places/"+promo.ida.destination.thumb} title={"Promo a "+promo.ida.destination.city}/>
                  </div>))};           
              </div>
            </div>);

  }

}

export default PromoHomeView;