import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import Connections from "../Connections";
import Header from "../Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Subscriptions = (props) => {
  const Luser = Cookies.get("Luser");

  //stroing the google credentials
  const storeData = async (Pname, gtoken, pic, email) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: Luser,
        name: Pname,
        token: gtoken,
        picture: pic,
        email: email,
      }),
    };

    const userurl = "http://localhost:5000/storeData";
    const response = await fetch(userurl, options);
    const data = await response.json();
    if (data.status === "ok") {
      console.log("data is stored");
    }
  };

  //getting the G-account profile info
  const getUserInfo = async (gtoken) => {
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: gtoken, jwtToken }),
    };
    const userurl = "http://localhost:5000/getUserInfo";
    const response = await fetch(userurl, options);
    const data = await response.json();
    console.log(data);
    storeData(
      data.userInfo.name,
      gtoken,
      data.userInfo.picture,
      data.userInfo.email
    );
  };

  //Authenticating google account.
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeResponse.code }),
      };
      const tokenurl = "http://localhost:5000/getToken";
      const resService = await fetch(tokenurl, options);
      const data = await resService.json();
      if (data.resp !== undefined) {
        // Cookies.set("gtoken", data.resp, { expires: 1000 });
        getUserInfo(data.resp);
      }
    },
    flow: "auth-code",
  });

  return (
    <div className="main-bg">
      <Header />
      <div className="content d-flex justify-content-center flex-column mt-5">
        <div>
          <Connections />
        </div>
        <div>
          <button
            type="button"
            onClick={() => login()}
            className="google-signin m-3 "
          >
            Add Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
