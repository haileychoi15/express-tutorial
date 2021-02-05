import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "components/views/Home";
import Login from "components/views/Login"
import Register from "components/views/Register";
import Navigation from "components/views/Navigation";
import { ArticleProvider } from "context/ArticleContext";
import { UserProvider } from "context/UserContext";

function App() {
  return (
    <ArticleProvider>
      <Router>
        <Navigation />
          <UserProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </UserProvider>
      </Router>
    </ArticleProvider>
  );
}

export default App;
