import Header from "../Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import Cookies from "js-cookie";

const API_KEY = "AIzaSyBXNxuEQ4bkl9xxHSLhgEPl67A4hfSI6QU";

class Dashboard extends Component {
  state = { sheetsData: [], rowStatus: false, coolumData: [] };

  componentDidMount() {
    this.dashBoardData();
  }

  //calling the stored sheets and tab names

  dashBoardData = async () => {
    const Luser = Cookies.get("Luser");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        luser: Luser,
      }),
    };

    const url = "http://localhost:5000/get-dash-board-data";
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.status === "ok") {
      const info = data.all;
      this.setState({ sheetsData: info });
    }
  };

  getValues = () => {
    const { sheetsData, coolumData } = this.state;

    //getting the values from each sheets
    Promise.allSettled(
      sheetsData.map(async (each) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${each.sheetId}/values/${each.tabId}?majorDimension=ROWS&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        const value = data.values[0].length;
        this.setState({
          coolumData: [...coolumData, { count: value, name: each.tabId }],
          rowStatus: true,
        });
      })
    );
  };
  render() {
    this.getValues();
    const { rowStatus, coolumData } = this.state;
    if (coolumData.length > 0) {
      this.setState({ ...this.state, rowStatus: true });
    }

    return (
      <>
        <Header />
        <div className="dashboard-bg d-flex flex-column justify-content-center align-items-center">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tab Name</th>
                <th scope="col">No of Colums</th>
              </tr>
            </thead>
            <tbody>
              {rowStatus ? (
                coolumData.map((each) => (
                  <tr>
                    <th scope="row">#</th>
                    <td>{each.name}</td>
                    <td>{each.count}</td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Dashboard;
