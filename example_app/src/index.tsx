import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import MainPage from './pages/main';
import { Route } from 'react-router';
import Full from './pages/full';
import CustomHeader from './pages/customHeader';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path={'/'} component={() => <MainPage />} />
      <Route exact path={'/full'} component={() => <Full />} />
      <Route exact path={'/custom'} component={() => <CustomHeader />} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
