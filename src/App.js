import logo from './logo.svg';
import './App.css';
import Integrantes from './views/forms/Integrantes';
import PersonasMaterial from './views/forms/PersonasMaterial';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  function Navbar(){
    return (
      <nav className="topnav">
        <Link to="/integrantes">Integrantes</Link>
        <Link to="/personas">Personas</Link>
      </nav>
    )
  }
  return (
    <Router>
      <Navbar />
    <Switch>
        <Route path="/integrantes" component={Integrantes} />
        <Route path="/personas" component={PersonasMaterial} />
    </Switch>
    </Router>
  );
}

export default App;
