import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import "./index.css";
import Nav from "react-bootstrap/Nav";

const Header = (props) => {
  const logout = () => {
    Cookie.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };
  return (
    // <div className="header-bg">
    //   <div className="header-contanier d-flex justify-content-between m-3 p-1">
    //     <div>
    //       <img
    //         alt="logo"
    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReShObaQ06oABZEZQA8HG90H8sWf9oHH4R5Q&usqp=CAU"
    //         className="logo-img"
    //       />
    //     </div>
    //     <div className="d-flex justify-content-between">
    //       <Link to="/subscriptions">
    //         <p className="subscription p-1">Subscriptions</p>
    //       </Link>

    //
    //     </div>
    //   </div>
    // </div>
    <Nav className="justify-content-end p-2 bg-primary" activeKey="/dashboard">
      <Nav.Item>
        <Nav.Link href="/dashboard" className="text-white">
          DashBoard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/subscriptions" className="text-white">
          Subscriptions
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <button type="button" onClick={logout} className="log-out mt-1">
          Log out
        </button>
      </Nav.Item>
    </Nav>
  );
};

export default withRouter(Header);
