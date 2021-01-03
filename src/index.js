import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContext} from "./context/AppContext"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <AppContext>
    <App />
    </AppContext>,
  document.getElementById('root')
);
