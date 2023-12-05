import React, { useState } from "react";
import { updateProfileApi } from "../../utils/authApi";
import "../../styles/updateProfile.css"; 

export default function UpdateProfile() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

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
        phone
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

  return (
    <div className="update-profile-container">
      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit} className="profile-form">
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
