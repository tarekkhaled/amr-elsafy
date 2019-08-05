import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './login';
import Additions from './additions';
import Statistics from './statistics';
import './css/App.css';
import Navbar from './navbar';

function App() {
  return (  
    <div>
    <Navbar/>
    <BrowserRouter>
      <Switch>
        <Route exact path = '/login' component = {Login}></Route>
        <Route exact path = '/additions' component = {Additions}></Route>
        </Switch>
    </BrowserRouter>
    </div>
       
  );
}

export default App;
