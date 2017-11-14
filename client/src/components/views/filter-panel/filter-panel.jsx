//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Componentes
import Slider from 'react-rangeslider';

//Styles
import './filter-panel.less';

//Rutas de homepage.
class FilterPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {pax    : 5,
                  type   : {mountain:false, city:false, hot:false, sea:false, mount:false},
                  prices : {min:0, max:parseInt(this.props.price), value:parseInt(this.props.price)},
                  dest   : []};

    this.updatePrices = this.updatePrices.bind(this);
    this.updateTypes  = this.updateTypes.bind(this);
    this.updatePax    = this.updatePax.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Cuando se realiza algún cambio en el estado, mando el estado a la funcion por prop.
  handleChange(){
    this.props.onChange(this.state);
  }

  //Actualizo los pasajeros.
  updatePax(val){
    this.setState({pax:val});
    this.handleChange();
  }

  //Cada vez que se actualiza el slider de precios.
  updatePrices(val){

    this.setState({prices:{min:this.state.prices.min, max:this.state.prices.max, value:val}});
    this.handleChange();

  }

  //Actualizo los tipos.
  updateTypes(cod,val){

    this.setState({type:{mountain:(cod=='mountain')? val.target.checked : this.state.type.mountain, 
                         city:    (cod=='city')?     val.target.checked : this.state.type.city, 
                         hot:     (cod=='hot')?      val.target.checked : this.state.type.hot, 
                         sea:     (cod=='sea')?      val.target.checked : this.state.type.sea, 
                         mount:   (cod=='mount')?    val.target.checked : this.state.type.mount}},this.handleChange);

  }



  render() {  

    return (<div className="col-md-3 filter-panel">
              <div className="panel panel-default filter-body">
                <div className="panel-heading">
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp;
                  <b>Busca tú vuelo</b>
                </div>
                <div className="panel-body">
                  {/*Pasajeros*/}
                  <div>
                    <div className="title-separator">
                      <span className="glyphicon glyphicon-triangle-right orange" aria-hidden="true"></span>&nbsp;
                      Total de pasajeros
                    </div>
                    <div>
                      <span className="glyphicon glyphicon-user orange" aria-hidden="true"></span>&nbsp;
                      Seleccione la cantidad de pasajeros<br/>
                    </div>
                    <span className="orange">
                      <b>Cantidad maxima</b>: 10 pasajeros
                    </span>                    
                    <div>
                      <div className="row">
                        <div className="col-md-11">                          
                           <Slider
                              min={1}
                              max={10}
                              value={this.state.pax}
                              onChangeStart={()=>{}}
                              onChange={this.updatePax}
                              onChangeComplete={()=>{}}
                            key ="1"/>
                          <b>&bull;&nbsp;Pasajeros</b>: {this.state.pax}                            
                        </div>
                      </div>
                    </div>
                  </div>
                  <br/>
                  {/*Tipo de viaje*/}
                  <div>
                    <div className="title-separator">
                      <span className="glyphicon glyphicon-triangle-right orange" aria-hidden="true"></span>&nbsp;
                      Tipo de viaje:
                    </div>
                    <div>
                      Según la ciudad de destino:<br/><br/>
                    </div>                          
                    <div>
                      <div className="row">
                        <div className="col-md-5">
                          <input type="checkbox" checked={this.state.type.mountain} onChange={(val)=>this.updateTypes('mountain',val)}/>&nbsp;Montaña
                        </div>
                        <div className="col-md-5">
                          <input type="checkbox" checked={this.state.type.city}     onChange={(val)=>this.updateTypes('city',val)}/>&nbsp;Ciudad
                        </div>
                        <div className="col-md-5">
                          <input type="checkbox" checked={this.state.type.hot}     onChange={(val)=>this.updateTypes('hot',val)}/>&nbsp;Calor
                        </div>
                        <div className="col-md-5">
                          <input type="checkbox" checked={this.state.type.sea}     onChange={(val)=>this.updateTypes('sea',val)}/>&nbsp;Mar
                        </div>
                        <div className="col-md-5">
                          <input type="checkbox" checked={this.state.type.mount}   onChange={(val)=>this.updateTypes('mount',val)}/>&nbsp;Sierras
                        </div>
                      </div>
                    </div>
                  </div>
                  <br/>
                  {/*Slider de precio*/}
                  <div>
                    <div className="title-separator">
                      <span className="glyphicon glyphicon-triangle-right orange" aria-hidden="true"></span>&nbsp;
                      Elija el precio:
                    </div>
                    <span>
                      <b>Min</b>: $ {this.state.prices.min} - <b>Max</b> $ {this.state.prices.max}
                    </span>
                    <Slider
                      min={this.state.prices.min}
                      max={this.state.prices.max}
                      value={this.state.prices.value}
                      onChangeStart={()=>{}}
                      onChange={this.updatePrices}
                      onChangeComplete={()=>{}}
                      key ="2"
                    />
                    <b>&bull;&nbsp;Precio</b>: $&nbsp;{this.state.prices.value}
                  </div>
                  <br/>                  
                </div>
              </div>
            </div>);

  }

}

export default FilterPanel;