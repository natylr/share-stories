import React, { useState } from "react";
import { changePasswordApi } from "../../utils/authApi";
import "../../styles/changePassword.css";

export default function ChangePassword() {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem("token"); 

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await changePasswordApi(token, prevPassword, newPassword);

      if (response.status === "ok") {
        alert("Password changed successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="change-password-container">
      <h3>Change Password</h3>
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label className="label-change-password">Previous Password:</label>
          <input className="input-change-password"
            type="password"
            value={prevPassword}
            onChange={(e) => setPrevPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label-change-password">New Password:</label>
          <input className="input-change-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label-change-password">Confirm New Password:</label>
          <input className="input-change-password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="change-password-btn">
          Change Password
        </button>
      </form>
    </div>
  );
}