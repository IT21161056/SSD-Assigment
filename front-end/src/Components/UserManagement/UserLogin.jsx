import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserServices from "../Service/UserServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../UserManagement/Login.css";
import NavBar from "../NavBar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import client_id from "../OAuthcredentials";

const LoginForm = (params) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const submitClicked = (e) => {
    e.preventDefault();

    const loginTemplate = {
      email,
      password,
    };

    UserServices.login(loginTemplate)
      .then((response) => {
        const authenticatedUser = response.data.user;
        console.log("response >>", authenticatedUser);
        setUser(response.data.user);
        setIsAuthenticated(true);

        localStorage.setItem("accessToken", response.data.accessToken);

        if (authenticatedUser.role == "student") {
          console.log("true:student");
          nav("/StudentHome");
        } else if (authenticatedUser.role == "admin") {
          console.log("true:admin");
          nav("/AdminHome");
        } else if (authenticatedUser.role == "lecturer") {
          console.log("true:lecture");
          nav("/Lecture");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 429) {
          Swal.fire({
            icon: "error",
            title: "Too many login attempts",
            text: err.response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "User Name OR Password In correct!",
          });
        }
        console.log("failed");
      });
    // nav("/students")

    console.log(loginTemplate);
  };

  const [OAuthUser, setOAuthUser] = useState({});
  //Google OAuth
  const google = window.google;

  const handleCallBackResponse = (response) => {
    console.log("Encoded Jwt token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    let googleToken = response.credential
    if (userObject) {
      UserServices.getUserByEmail(userObject.email)
      .then((response) => {
        const authenticatedUser = response.data;
        console.log("response >>", authenticatedUser);
        setUser(response.data);
        setIsAuthenticated(true);

        localStorage.setItem("accessToken",googleToken);

        if (authenticatedUser.role == "student") {
          console.log("true:student");
          nav("/StudentHome");
        } else if (authenticatedUser.role == "admin") {
          console.log("true:admin");
          nav("/AdminHome");
        } else if (authenticatedUser.role == "lecturer") {
          console.log("true:lecture");
          nav("/Lecture");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 429) {
          Swal.fire({
            icon: "error",
            title: "Too many login attempts",
            text: err.response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "User Name OR Password In correct!",
          });
        }
        console.log("failed");
      });
    }
  };

  useEffect(() => {
    if (google) {
      google.accounts.id.initialize({
        client_id: client_id,
        callback: handleCallBackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("sign-in-div"), {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  return (
    <div>
      <div class="boxlog mt-5">
        <h1>Sign In</h1>

        <form onSubmit={submitClicked}>
          <div class="inputlog">
            <input
              type="text"
              name="email"
              placeholder="Email address..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <input type="submit" value="Sign in" className="sub " />

          <div id="sign-in-div">
            {/* {
            user &&
            <div>
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
          } */}
          </div>
        </form>
        <p>
          Don't have an accunt? <a href="/user/-1"> Create Account</a>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
