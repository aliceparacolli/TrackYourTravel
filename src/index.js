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

//root della pagina web
ReactDOM.render(
  <React.StrictMode>
    {/* è il contenitore redux definito in store */}
    <Provider store={store}>
      {/* si occupa della navigazione */}
      <BrowserRouter>
        <Switch>
          {/*
          * si occupa di quale componente renderizzare in base all'URL immesso dall'utente
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
