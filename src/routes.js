import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './hoComponents/layout';
import Login from './components/login';
import Additions from './components/additions';
import Statistics from './components/statistics';
import './resources/css/App.css';

function Routes() {
  return (  
      <Switch>
          <Layout>
              <Route exact path = '/login' component = {Login}></Route>
          </Layout>
          <Layout>
              <Route exact path = '/additions' component = {Additions}></Route>
          </Layout>
          <Layout>
              <Route exact path = '/statistics' component = {Statistics}></Route>
          </Layout>
      </Switch>
       
  );
}

export default Routes;
