// Dependencias
import ReactDOM 			from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory, Redirect } from 'react-router-dom';

// Ruta principal.
import MainRouter from './components/routes/routes.jsx';

// Genero el manejador de rutas.
ReactDOM.render(<MainRouter/>, document.getElementById('app'))