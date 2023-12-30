import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../utils/authApi";
import {defaultAvatarUrl} from "../../config/config"

export default function SignUp() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatarUrl);

  useEffect(() => {
    console.log(window.localStorage.getItem("loggedIn"))
    if (window.localStorage.getItem("loggedIn") === "true")
      navigate("/all-stories");
  }, []);

  

  const headerStyle = { margin: 0, color: "#1bbd7e" };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUserApi(
        fname,
        lname,
        email,
        password,
        address,
        city,
        phone,
        avatar
      );

      if (response.status === "ok") {
        alert("Registration Successful");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-main">
        <div className="auth-overlay"></div>
        <ReactPlayer
          width={"100%"}
          height="100%"
          url="http://localhost:3000/login_sign_up.mp4"
          playing={true}
          muted={true}
          loop={true}
        ></ReactPlayer>

        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={handleSubmit}>
                <h3 style={headerStyle}>Sign Up</h3>
                <div className="mb-3 row">
                {avatarPreview && (
                  <div className="col-md-6">
                  <label>Selected Image Preview:</label>
                    <img
                      src={avatarPreview}
                      className="avatar-preview"
                    />
                  </div>
                )}
                  <div className="col-md-6">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="form-control"
                  />
                </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label>First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3 row">

                <div className="col-md-6">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      onChange={handlePasswordConfirmChange}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

               
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/sign-in">sign in?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
