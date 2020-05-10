import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { Trip } from './pages/Trip';
import { NotFound } from './pages/NotFound';

//root of the web page
ReactDOM.render(
  <React.StrictMode>
    {/* it is the redux container defined in store */}
    <Provider store={store}>
      {/* si occupa della navigazione */}
      <BrowserRouter>
        <Switch>
          {/*
          * it takes care of which component to render based on the URL entered by the user
          */}
          <Route exact path="/trip/:tripId" component={Trip}/>
          <Route exact path="/notFound" component={NotFound}/>
          <Route component={Main}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
