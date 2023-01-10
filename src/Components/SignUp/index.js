import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  Login = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
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
        fname,
        lname,
        email,
        password,
      }),
    };
    const url = "http://localhost:5000/signup";
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      this.onSubmitSuccess();
    } else {
      this.setState({ errorMessage: data.error });
    }
  };

  renderFnameField = () => {
    const { fname } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="fname">
          Firstname
        </label>
        <input
          type="text"
          id="fname"
          className="password-input-filed"
          value={fname}
          onChange={(e) => this.setState({ fname: e.target.value })}
        />
      </>
    );
  };
  renderLnameField = () => {
    const { lname } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="lname">
          Lastname
        </label>
        <input
          type="text"
          id="lname"
          className="password-input-filed"
          value={lname}
          onChange={(e) => this.setState({ lname: e.target.value })}
        />
      </>
    );
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
          onChange={(e) => this.setState({ password: e.target.value })}
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
          onChange={(e) => this.setState({ email: e.target.value })}
          required
        />
      </>
    );
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="main-bg d-flex justify-content-center align-items-center mt-5">
        <div className="content">
          <form className="form-container" onSubmit={this.Login}>
            <div className="input-container">{this.renderFnameField()}</div>
            <div className="input-container">{this.renderLnameField()}</div>
            <div className="input-container">{this.renderemailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="signup-link">
              <button
                type="submit"
                className="btn bg-btn btn-primary mt-3 w-70"
              >
                Sign UP
              </button>
            </div>

            <small className="error-message">{errorMessage}</small>
            <p className="signup-btn">
              Alraedy having Account
              <Link to="/login"> Login Now!</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
