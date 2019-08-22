import React, { Fragment } from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './hoComponents/layout';
import Login from './components/login';
import Additions from './components/additions';
import AddStudent from './components/forms/studentForm';
import AddAssistant from './components/forms/assistantForm';
import AddCenter from './components/forms/centerForm';
import AddGroup from './components/forms/groupForm';
import Statistics from './components/statistics';
import './resources/css/App.css';

function Routes() {
  return (  
    <Fragment>
        <Layout>
            <Switch>
                <Route exact path = '/login' component = {Login}></Route>
                <Route exact path = '/additions' component = {Additions}></Route>
                <Route exact path = '/addStudentForm' component = {AddStudent}></Route>
                <Route exact path = '/addAssistantForm' component = {AddAssistant}></Route>
                <Route exact path = '/addCenterForm' component = {AddCenter}></Route>
                <Route exact path = '/addGroupForm' component = {AddGroup}></Route>
                <Route exact path = '/statistics' component = {Statistics}></Route>

            </Switch>
        </Layout>               
    </Fragment>
  );
}

export default Routes;
