// Dependencias
import React, { Component } from 'react';
import { Link }   from 'react-router-dom';
import { render } from 'react-dom';

import PropTypes  from 'prop-types';

//Control de moneda
class Currency extends Component {

  constructor(props) {
    super(props);

    this.state = {value:this.props.value};

    this.convertToCurrency = this.convertToCurrency.bind(this);
    this.handleChange      = this.handleChange.bind(this);

  }

  convertToCurrency(input){
      
    let value = new String(input);

    value = value.replace(/[^0-9.]/g,'');
    value = value.replace(/\.+/g,'.'); 
    value = value.replace(/(.*\.[0-9][0-9]?).*/g,'$1');
    value = value.replace(/^0+(.*)$/,'0$1');
    value = value.replace(/^0([^.].*)$/,'$1');

    return value;

  }  

  componentWillMount() {

    let value = this.convertToCurrency(this.state.value);

    this.setState({value:new String(parseFloat(value).toFixed(2))});
    this.props.onChange(this.state.value);

  }

  handleChange (event){

    let val = this.convertToCurrency(event.target.value);

    this.setState({value:val});

    // notify that value changed
    this.props.onChange(this.state.value);

  }

  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChange} />;
  }

}

export default Currency;
