import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers/reducer';
import Home from './components/Home';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faSave, faPlus,faCarAlt, faSignOutAlt, faPencilAlt, faAngleLeft, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const store = createStore(reducer);

library.add(faTrashAlt, faSave, faPlus,faCarAlt, faSignOutAlt, faPencilAlt, faAngleLeft, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faFilter, faSearch)


ReactDOM.render(
    <Provider store={store}>
        <Router basename="/app">
            <Home />
        </Router>
    </Provider>, 
    document.getElementById('root')
);
