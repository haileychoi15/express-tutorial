import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "components/views/Home"
import Login from "components/views/Login"
import Register from "components/views/Register"
import { ArticleProvider } from "context/ArticleContext";

function App() {
  return (
    <ArticleProvider>
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
        </div>
      </Router>
    </ArticleProvider>
  );
}

export default App;
