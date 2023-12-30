import React, { useState, useEffect } from "react";
import { updateProfileApi, getUserDataApi } from "../../utils/authApi";
import "../../styles/updateProfile.css";
import { defaultAvatarUrl, BASE_URL } from "../../config/config"

export default function UpdateProfile() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatarUrl);

  useEffect(() => {
    const fetchData = async () => {
      const token = window.localStorage.getItem("token");

      try {
        const response = await getUserDataApi(token);

        if (response.status === "ok") {
          const userData = response.data;
          setFname(userData.fname);
          setLname(userData.lname);
          setAddress(userData.address);
          setCity(userData.city);
          setPhone(userData.phone);
          if (userData.avatarUrl)
            setAvatarPreview(BASE_URL+'/' + userData.avatarUrl);
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Something went wrong");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem("token");
    try {
      const response = await updateProfileApi(
        token,
        fname,
        lname,
        address,
        city,
        phone,
        avatar
      );

      if (response.status === "ok") {
        alert("Profile updated successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong");
    }
  };
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
  return (
    <div className="update-profile-container">
      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit} className="profile-form">
        
        {avatarPreview && (
          <div className="form-group">
            <label>Current Avatar:</label>
            <img src={avatarPreview} alt="Avatar" className="current-avatar" />
          </div>
        )}
        <div className="form-group">
          <label>Change Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <p className="forgot-password text-right">
        </p>
        <button type="submit" className="update-btn">
          Update Profile
        </button>

      </form>
      <a href="/change-password" className="change-password">change your password</a>

    </div>
  );
}
