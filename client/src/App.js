import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "components/views/Home";
import Dashboard from "components/views/Dashboard";
import Login from "components/views/Login"
import Register from "components/views/Register";
import Navigation from "components/views/Navigation";
import { ArticleProvider } from "context/ArticleContext";
import { AuthProvider } from "context/AuthContext";

function App() {
  return (
    <ArticleProvider>
      <Router>
          <AuthProvider>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </AuthProvider>
      </Router>
    </ArticleProvider>
  );
}

export default App;
