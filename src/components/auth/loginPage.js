import React, { Component, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { setUserId, setFirstName, setLastName, setEmail } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setAuthEmail] = useState(window.localStorage.getItem("saved-email") || "");
  const [password, setAuthPassword] = useState(window.localStorage.getItem("saved-password") || "");
  const [rememberMe, setRememberMe] = useState(true);
  const headerStyle = { margin: 0, color: '#1bbd7e' }
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const firstNamestate = useSelector(state => state.user.firstName);

  
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/user/login-user", {
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          if (rememberMe) {
            window.localStorage.setItem("saved-email", email);
            window.localStorage.setItem("saved-password", password);
          } else {
            window.localStorage.removeItem("saved-email");
            window.localStorage.removeItem("saved-password");
          }
          fetch("http://localhost:5000/user/user-data", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              token: window.localStorage.getItem("token"),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data === "Invalid Token") {
                alert("Token expired, please login again");
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("loggedIn");
              } else {
                console.log(data.data.fname)
                console.log('Before dispatching:', firstNamestate);
                dispatch(setFirstName(data.data.fname))
                console.log('After dispatching:', firstNamestate);
                navigate("/user-page");
              }
            });
        } else {
          alert(data.error);
        }
      });
  }

  return (
    <div className="auth-body">
      <div className='auth-main'>
        <div className="auth-overlay"></div>
        <ReactPlayer width={'100%'} height='100%'
          url="http://localhost:3000/login_sign_up.mp4"
          playing={true}
          muted={true}
          loop={true}
          config={{
            file: {
              attributes: {
                controlsList: "nofullscreen",
              },
            },
          }}
        />
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={handleSubmit}>
                <h3 style={headerStyle}>Sign In</h3>

                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setAuthEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setAuthPassword(e.target.value)}
                    value={password}
                  />
                </div>

                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="custom-control-label" htmlFor="customCheck1" style={headerStyle}>
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  <a href="/sign-up">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
