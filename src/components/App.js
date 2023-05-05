import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Contacts from './Contacts';
import AddAnimal  from './AddAnimal'
import showDetails from './ShowDetails';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  return (
    <div className="App">
     {/* THE DIFFERENT ROUTES AVAILABLE THAT WILL GIVE ACCESS TO THE PAGES */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/add-animal" component={AddAnimal }/> 
          <Route path="/:id" component={showDetails}/>
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
