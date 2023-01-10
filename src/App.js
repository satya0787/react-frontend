import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import Subscriptions from "./Components/Subscriptions";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./App.css";

class App extends Component {
  state = { loginUser: "" };

  setLoginUser = (user) => {
    this.setState({ loginUser: user });
  };

  render() {
    const { loginUser } = this.state;
    console.log(loginUser);
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} setUser={this.setLoginUser} />
          <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
            loggedUser={loginUser}
          />
          <ProtectedRoute
            path="/subscriptions"
            component={Subscriptions}
            loggedUser={loginUser}
          />
          <Route path="/" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
