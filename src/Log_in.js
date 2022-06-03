import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./Log_in.css";
import "./Registration.css";
import info from "./Info.js";
import Chat from "./chat.js";
import * as aj from "./Ajax";

function Log_in() {
  const [error, setError] = useState("");
  let navigate = useNavigate();

  var inputspaces = document.getElementsByTagName("input");
  useEffect (()=>{
    if(error === "success") {
      navigate("/chat?username=" + inputspaces[0].value);
    }
  });
  var all;
  const func = async(event) => {
    event.preventDefault();
    var user, flag=0;
    document.getElementById("loginscreen").style="height: 280px"
    all =await aj.allUsers();
    for (user in all) {
      if (all[user].id === inputspaces[0].value) {
        if (all[user].password === inputspaces[1].value) {
          flag=1;
          aj.loginnn(inputspaces[0].value, inputspaces[1].value);
          setError("success");
        }
      }
    }
    if(flag===0) {
      setError("details do not match");
    }
  };

  return (
    <form onSubmit={func}>
      <div className="logscreen border border-success" id="loginscreen">
        {(error!="") ? (<h5 className="error"> {error} </h5>) : "" }
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Username
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            required
          />
        </div>

        <div>
          
            <input
            type="submit"
            value="Login"
            className="login_button btn btn-secondary"/>
        </div>

        <div className="sign">
          <span>new here? &nbsp;</span>
          <span>
            <Link to="/registration" className="link-success">
              register!
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}

export default Log_in;
