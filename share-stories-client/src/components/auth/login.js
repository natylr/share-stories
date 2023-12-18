import React, {useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";
import {logout, saveUserData} from "../../utils/localStorage"
import { loginUserApi, getUserDataApi } from '../../utils/authApi';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if(window.localStorage.getItem("loggedIn") ==="true")
      navigate("/all-stories");
  },[])
  const [email, setAuthEmail] = useState(window.localStorage.getItem("saved-email") || "");
  const [password, setAuthPassword] = useState(window.localStorage.getItem("saved-password") || "");
  const [rememberMe, setRememberMe] = useState(true);
  const headerStyle = { margin: 0, color: '#1bbd7e' }
  
  async function handleSubmit(e) {
    e.preventDefault();

    // try {
      const loginResponse = await loginUserApi(email, password);

      if (loginResponse.status === "ok") {
        alert("Login successful");
        window.localStorage.setItem("token", loginResponse.data);
        window.localStorage.setItem("loggedIn", true);

        if (rememberMe) {
          window.localStorage.setItem("saved-email", email);
          window.localStorage.setItem("saved-password", password);
        } else {
          window.localStorage.removeItem("saved-email");
          window.localStorage.removeItem("saved-password");
        }
        console.log(loginResponse.data)
        const userDataResponse = await getUserDataApi(loginResponse.data);
        console.log(userDataResponse)
        if (userDataResponse.data === "Invalid Token") {
          logout();
        } else {
          saveUserData(userDataResponse);
          navigate("/all-stories");
        }
      } else {
        alert(loginResponse.error);
      }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert("Something went wrong");
    // }
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
