import React, { Fragment } from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './hoComponents/layout';
import Login from './components/login';
import Additions from './components/additions';
import {AddAssistant,AddStudent,AddCenter,AddGroup} from './components/forms';
import {Students,Assistants,Groups} from './components/dataShown';
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
                <Route exact path = '/students' component = {Students}></Route>
                <Route exact path = '/assistants' component = {Assistants}></Route>
                <Route exact path = '/Groups_Centers_info' component = {Groups}></Route>
            </Switch>
        </Layout>               
    </Fragment>
  );
}

export default Routes;
