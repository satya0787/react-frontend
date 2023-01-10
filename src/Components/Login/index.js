import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import "./index.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    const { email } = this.state;

    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    Cookies.set("Luser", email, { expires: 1 });
    history.replace("/subscriptions");
  };

  Login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    const options = {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const url = "http://localhost:5000/login-user";
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      this.onSubmitSuccess(data.data);
    } else {
      this.setState({ errorMessage: data.error });
    }
  };

  onChangeemail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderemailField = () => {
    const { email } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="email-input-filed"
          value={email}
          onChange={this.onChangeemail}
          required
        />
      </>
    );
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="login-form-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReShObaQ06oABZEZQA8HG90H8sWf9oHH4R5Q&usqp=CAU"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReShObaQ06oABZEZQA8HG90H8sWf9oHH4R5Q&usqp=CAU"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.Login}>
          <div className="input-container">{this.renderemailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <small className="error-message">{errorMessage}</small>
          <p className="signup-link">
            Not a Member
            <Link to="/signUp"> Sign Up Now!</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
