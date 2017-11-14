//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Componentes.
import Currency from '../../widgets/currency.jsx';

//Styles
import './search-form-view.less';

//Rutas de homepage.
class SearchFormView extends Component {

  constructor(props) {
    super(props);

    this.state = {currency:800, destiny:null};

    this.getDestiny = this.getDestiny.bind(this);

  }

  getDestiny(){

    if (this.state.destiny==null){
      if (this.props.depature!=null)
        if (this.props.depature.length>0)
          return  this.props.depature[0].iata;
    }

    return this.state.destiny;

  }

  render() {  

    let destiny = this.getDestiny();

    return (<div className="form-div">
              <div className="form-search">
                {/* Tabs Div */}
                <div className="form-snippet">
                  <div className="btn-snippet">
                    <img src="/img/plane.png" className="plane-icon"/>
                    Busca tu vuelo
                  </div>
                </div>
                {/* Form Div */}
                <div className="form-body">
                  <div className="row">
                    <div className="fields-col col-md-6">
                      <div>Presupuesto sugerido ($)</div>
                      <Currency value={this.state.currency} onChange={(val)=>this.setState({currency:val, destiny:this.state.destiny})}/>
                    </div>
                    <div className="fields-col  col-md-6">
                      <div>Lugar de partida</div>
                      <select onChange={(e)=>this.setState({currency:this.state.currency, destiny:e.target.value})}>
                        {this.props.depature.map((destiny,i)=><option key={i} value={destiny.iata}>{destiny.city+' - '+destiny.iata}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ida-vuelta">
                      <input type="checkbox" checked="true" disabled="true"/>&nbsp;Ida y Vuelta
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Link to={`/search/${this.state.currency}/${destiny}`} className="link">
                        <div className="searchBtn">
                          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                          &nbsp;Buscar
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>);

  }

}

export default SearchFormView;