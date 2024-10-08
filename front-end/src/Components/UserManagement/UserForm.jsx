import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserServices from "../Service/UserServices.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../UserManagement/Register.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.js";
const UserForm = (params) => {
  const [status, setstatus] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [lastName, setlastName] = useState("");
  const [initials, setinitials] = useState("");
  const [email, setemail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [faculty, setfaculty] = useState("");
  const [regNumber, setregNumber] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("user");
  const [regStatus1, setRegStatus1] = useState("");
  const [regStatus2, setRegStatus2] = useState("");
  const { userDetails, setUserDetails, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (id == "-1") {
      setstatus("Register New ");
    } else {
      var x = document.getElementById("myDIV");
      x.style.display = "none";
      var x = document.getElementById("myDIV1");
      x.style.display = "none";
      setstatus("Update ");
      const fetchUserData = async () => {
        try {
          const response = await UserServices.getUser(id);
          setlastName(response.data.lastName);
          setinitials(response.data.initials);
          setemail(response.data.email);
          setmobileNumber(response.data.mobileNumber);
          setfaculty(response.data.faculty);
          setregNumber(response.data.regNumber);
          setpassword(response.data.password);
          setrole(response.data.role);
          console.log(response);
        } catch (error) {
          console.log("Error fetching users", error);
        }
      };

      fetchUserData();
    }
    if (isAuthenticated == true) {
      setRegStatus1("");
      setRegStatus2("");
    } else {
      setRegStatus1("Already Have An Account");
      setRegStatus2("Log In");
    }
  }, [id, isAuthenticated]);

  const submitClicked = (e) => {
    e.preventDefault();

    const newuser = {
      lastName,
      initials,
      email,
      mobileNumber,
      faculty,
      regNumber,
      password,
      role,
    };

    if (id === "-1") {
      // handle user creation
      UserServices.createUser(newuser)
        .then((res) => {
          Swal.fire("Registration succesfull.");
          if (isAuthenticated) {
            nav("/users");
          } else {
            nav("/login");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            Swal.fire({
              icon: "warning",
              title: "Rate Limit Exceeded",
              text: "'You have made too many registration attempts. Please wait a few minutes before trying again.'",
              timer: 5000,
              showConfirmButton: true,
            });
          } else {
            console.log("failed");
            Swal.fire("Registration failed. Please try again.");
          }
        });
    } else {
      // handle server update
      UserServices.updateUser(id, newuser)
        .then(() => {
          Swal.fire(" succesfull.");
          nav("/users");
        })
        .catch((err) => {
          Swal.fire("Update failed. Please try again.");
          console.error("Update failed", err);
        });
    }
  };

  return (
    <div className="container ">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className=" boxmr shadow card col-md-8 offset-md-2 offset-md-2">
        <div className="card-body">
          <div>
            <center>
              <h1 className="fontreg">{status} User</h1>
            </center>
          </div>
          <form onSubmit={submitClicked}>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Last Name : </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  minlength="5"
                  value={lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Initials : </label>
              <div className="col-sm-8 ">
                <input
                  type="text"
                  className="form-control"
                  value={initials}
                  onChange={(e) => {
                    setinitials(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Mobile number :{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  minlength="10"
                  maxlength="10"
                  pattern="[0-9]*"
                  value={mobileNumber}
                  onChange={(e) => {
                    setmobileNumber(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Email : </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Department : </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={faculty}
                  onChange={(e) => {
                    setfaculty(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div id="myDIV">
              <br></br>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Registeration Number :
                </label>
                <div className="col-sm-8">
                  <input
                    minlength="7"
                    maxlength="7"
                    type="text"
                    className="form-control"
                    value={regNumber}
                    onChange={(e) => {
                      setregNumber(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Password : </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <br />
            <div className="text-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary "
              />
            </div>
            <br />
            <div id="myDIV1">
              <div className="text-center">
                {regStatus1}{" "}
                <Link to="/login" className="text-center">
                  {regStatus2}{" "}
                </Link>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
