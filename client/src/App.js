import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "components/views/Home"
import Login from "components/views/Login"
import Register from "components/views/Register"

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
