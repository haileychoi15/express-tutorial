import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "components/views/Home";
import Dashboard from "components/views/Dashboard";
import Login from "components/views/Login"
import Register from "components/views/Register";
import Admin from "components/views/Admin";
import Navigation from "components/views/Navigation";
import { ArticleProvider } from "context/ArticleContext";
import { AuthProvider } from "context/AuthContext";
import Auth from "hoc/auth";

function App() {
  return (
    <ArticleProvider>
      <Router>
          <AuthProvider>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Auth(Dashboard, true)} />
              <Route exact path="/login" component={Auth(Login, false)} />
              <Route exact path="/register" component={Auth(Register, false)} />
              <Route exact path="/admin" component={Auth(Admin, true, true)} />
            </Switch>
          </AuthProvider>
      </Router>
    </ArticleProvider>
  );
}

export default App;
