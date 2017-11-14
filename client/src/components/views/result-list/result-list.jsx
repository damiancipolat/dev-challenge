//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Styles
import './result-list.less';

//Rutas de homepage.
class ResultList extends Component {

  constructor(props) {
    super(props);

    this.state = {result:this.props.result};

    this.drawTicket = this.drawTicket.bind(this);

  }

  drawTicket(flight){

    return (<div className="ticket">
              <div className="ticket-body">
                <h3>
                    <img src="/img/plane_up.png"/>&nbsp;&nbsp;
                    <b>{flight.ida.origin.iata} - {flight.ida.destination.iata}</b>
                </h3>
                <div>                        
                  <h4>
                    <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>&nbsp;
                    {flight.ida.flightCode} |  {flight.ida.origin.city} - {flight.ida.destination.city} | {flight.ida.data} |&nbsp;
                    <span className="glyphicon glyphicon-user orange" aria-hidden="true"></span>&nbsp; Disponibles: {flight.ida.availability}
                  </h4>
                </div>
                <div>                        
                  <h4>
                    <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;
                    {flight.vuelta.flightCode} |  {flight.vuelta.origin.city} - {flight.vuelta.destination.city} | {flight.ida.data} |&nbsp;
                    <span className="glyphicon glyphicon-user orange" aria-hidden="true"></span>&nbsp; Disponibles: {flight.vuelta.availability}
                  </h4>
                </div>
              </div>
              <div className="ticket-price">
                <div  className="price">
                  <span>$ {Math.round(flight.ida.price+flight.vuelta.price)}</span>
                </div>
                <div  className="buy-btn">
                  <div>
                    <span className="glyphicon glyphicon-tags" aria-hidden="true"></span>
                    &nbsp;&nbsp;<b>Comprar</b>
                  </div>
                </div>                        
              </div>
            </div>);

  }

  render() {  

    let results = null;


    if (this.props.result.length>0){
      let preResult = this.props.result.slice(1,100);
      results = preResult.map((flight,i)=><div key={i}>{this.drawTicket(flight)}</div>);
    }
    else
      results = <div className="orange"><h3>&nbsp;&nbsp;<span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>&nbsp;No se encontraron resultados</h3></div>;

    return (<div className="col-md-9">
              <div className="results-panel">
                {this.state.result.length>0&&<h3>Resultados encontrados</h3>}
                <div>
                  {/*Lista de vuelos.*/}
                  <div className="flightDiv row">
                    {/*Vuelo*/}
                    {results}
                  </div>
                </div>
              </div>                    
            </div>);

  }

}

export default ResultList;