//Dependencias
import ReactDOM             from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

//Api
import Api     from '../../../service/api.js';
import Filter  from '../../../service/filter/filter.js';

//Incorporo componentes.
import FooterView  from '../footer/footer-home-view.jsx';
import HeaderView  from '../header/header-view.jsx';
import FilterPanel from '../filter-panel/filter-panel.jsx';
import ResultList  from '../result-list/result-list.jsx';
import Loader      from '../result-list/loader.jsx';

//Styles
import './results-view.less';

//Rutas de homepage.
class ResultsView extends Component {

  constructor(props) {
    super(props);
   
    this.state = {loader:true, flights:[], filterFlights:[], origin: this.props.route.match.params.destiny, price: this.props.route.match.params.price};

    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount(){

    Api.searchRoundTrip(this.state.origin,this.state.price).then((result)=>{

      //Aplico filtro basico, solo limita el array.
      let filter = Filter.applyFilter(result,null);

      this.setState({loader:false, flights:result,filterFlights:filter});

    });

  }

  handleFilter(stateFilter){

    console.log(stateFilter);

    //Traigo el resultado del filtrado.
    let filterResu = Filter.applyFilter(this.state.flights,stateFilter);

    this.setState({loader:this.state.loader,flights:this.state.flights,filterFlights:filterResu});
  }

  render() {  
      console.log('@',this.state.filterFlights.length);
    return (<div className="full-body">
              <HeaderView/>
              <ol className="breadcrumb">
                <span className="glyphicon glyphicon-triangle-right orange" aria-hidden="true"></span>
                &nbsp;&nbsp;
                <li className="breadcrumb-item">
					         <Link to='/'>Tu presupuesto</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#"><b>Elegi tú vuelo</b></a>
                </li>
              </ol>
              <div>
                <div className="row fix-row">
                  <FilterPanel onChange={this.handleFilter} price={this.state.price}/>
                  {this.state.loader?<Loader/>:<ResultList result={this.state.filterFlights}/>}
                </div>
              </div>              
              <FooterView/>
            </div>);

  }

}

export default ResultsView;