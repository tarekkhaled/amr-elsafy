import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './login';
import Additions from './additions';
import Statistics from './statistics';
import './css/App.css';

function App() {
  return (  
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" exact component={Login} />
        <Route exact path="/additions" component={Additions}/>
        <Route exact path="/statistics" component={Statistics} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
