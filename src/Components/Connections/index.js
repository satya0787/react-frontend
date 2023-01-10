import { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

import "./index.css";

const API_KEY = "AIzaSyBXNxuEQ4bkl9xxHSLhgEPl67A4hfSI6QU";

class Connections extends Component {
  state = {
    users: [],
    sheets: {},
    sheetStatus: false,
    email: "",
    sheetId: "",
    gtoken: {},
    tabValueStatus: false,
    tabValue: {},
    tabId: "",
    loggedUser: "",
  };

  componentDidMount() {
    this.getusers();
  }

  //Getting Stored users data

  getusers = async () => {
    const Luser = Cookies.get("Luser");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        luser: Luser,
      }),
    };

    const url = "http://localhost:5000/getUserData";
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.status === "ok") {
      const info = data.all;
      // console.log(info);
      this.setState({ ...this.state, users: info, gtoken: info.token });
    }
  };

  renderForm = () => {
    const {
      email,
      sheets,
      sheetStatus,
      sheetId,
      tabValue,
      tabValueStatus,
      tabId,
    } = this.state;

    // storing sheetids and tabs
    const addData = async (props) => {
      const { tabId, sheetId } = this.state;
      const Luser = Cookies.get("Luser");

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: Luser,
          tabId,
          sheetId,
        }),
      };

      const url = "http://localhost:5000/dashB-data";
      const response = await fetch(url, options);
      const data = response.json();
      if (data.status === "ok") {
        console.log("data added");
      }
    };

    const seleCtedTab = (event) => {
      this.setState({ ...this.state, tabId: event.target.value });
    };

    const handleClose = () => this.setState({ sheetStatus: false });

    const gettabs = async (event) => {
      console.log(event.target.value);
      this.setState({ ...this.state, sheetId: event.target.value });
      const options = { method: "get" };
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${event.target.value}?fields=sheets%2Fproperties&key=${API_KEY}`;
      const res = await fetch(url, options);
      const tabs = await res.json();
      console.log(tabs);
      this.setState({
        ...this.state,
        tabValue: tabs.sheets,
        tabValueStatus: true,
      });
    };

    return (
      <Modal
        show={sheetStatus}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ opacity: 1 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>{`Adding a Subscription ${email} `}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <label className="lable-name">Sheet Name</label>
            <select className="select-sheet" value={sheetId} onChange={gettabs}>
              <option value="" defaultValue="" disabled hidden>
                Select the Sheet
              </option>
              {sheets.map((each) => {
                return (
                  <option
                    className="sheets-values"
                    key={each.id}
                    value={each.id}
                  >
                    {each.name}
                  </option>
                );
              })}
            </select>

            <label className="lable-name">Tab Name</label>

            {tabValueStatus ? (
              <select
                className="select-sheet"
                value={tabId}
                onChange={seleCtedTab}
              >
                <option value={tabId} disabled>
                  Select the tab
                </option>
                (
                {tabValue.map((each) => {
                  return (
                    <option
                      className="sheets-values"
                      key={each.properties.sheetId}
                      value={each.properties.title}
                    >
                      {each.properties.title}
                    </option>
                  );
                })}
                )
              </select>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addData}>
            Add Data
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const { users, sheets, sheetStatus, email, gtoken } = this.state;
    console.log(gtoken);

    // console.log(sheets);
    // console.log(sheetStatus);
    // console.log(email);
    // const { luser } = this.props;
    // console.log(this.props);
    // this.setState({ loggedUser: luser });

    return (
      <div className="users-bg d-flex flex-column justify-content-center align-content-center m-3">
        <h3 className="sub-head m-2">Added Subscriptions</h3>
        <ul className="sub-lst">
          {users.map((each) => (
            <li className="sub d-flex m-2" key={each.name}>
              <div>
                <img
                  src={each.picture}
                  className="img rounded-circle"
                  alt="account-profilePic"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={async () => {
                    const options = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ token: each.token }),
                    };

                    const url = "http://localhost:5000/readDrive";
                    const response = await fetch(url, options);
                    const data = await response.json();
                    if (data.status === "ok") {
                      // console.log(data);
                      this.setState({
                        ...this.state,
                        sheets: data.driveFiles,
                        sheetStatus: true,
                        email: each.email,
                        gtoken: each.token,
                      });
                    }
                  }}
                  data-target="#exampleModal"
                  data-toggle="modal"
                  className="btn-bg   account-style"
                >
                  {" "}
                  {each.name}
                </button>

                {sheetStatus ? this.renderForm() : ""}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Connections;
