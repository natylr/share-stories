import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from '../../utils/authApi';
import Background from "../../utils/background"

export default function SignIn() {


  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token"))
      navigate("/all-stories");
  }, [navigate])
  
  const [email, setAuthEmail] = useState(window.localStorage.getItem("saved-email") || "");
  const [password, setAuthPassword] = useState(window.localStorage.getItem("saved-password") || "");
  const [rememberMe, setRememberMe] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const loginResponse = await loginUserApi(email, password);

      if (loginResponse.status === "ok") {
        alert("Login successful");
        window.localStorage.setItem("token", loginResponse.data);

        if (rememberMe) {
          window.localStorage.setItem("saved-email", email);
          window.localStorage.setItem("saved-password", password);
        } else {
          window.localStorage.removeItem("saved-email");
          window.localStorage.removeItem("saved-password");
        }
        navigate("/all-stories");

      } else {
        alert(loginResponse.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong");
    }
  }

  const signUp = () => {
    navigate("/sign-up")
  }

  return (
    <div className="auth-body">
      <div className='auth-main'>
        <div className="auth-overlay"></div>
        <Background />
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={handleSubmit}>
                <h3 className="auth-header">Sign In</h3>

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

                <div className="mb-3 d-flex align-items-center">
                 
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberMeCheckBox"
                      checked={rememberMe}
                      onChange={() => setRememberMe((prevState) => !prevState)}
                    />
                  </div>
                  <label className="custom-control-label" htmlFor="rememberMeCheckBox">
                    Remember me
                  </label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  <label className="link-label" onClick={signUp}>Sign Up</label>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
