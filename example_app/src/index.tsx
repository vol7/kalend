import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import MainPage from './pages/main';
import { Route } from 'react-router';
import Full from './pages/full';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*// @ts-ignore*/}
      <Route exact path={'/'}>
        <MainPage />
      </Route>
      <Route path={'/full'}>
        <Full />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
