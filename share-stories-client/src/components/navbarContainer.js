
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { logout } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import "../styles/navbarContainer.css";
import { getUserDataApi } from "../utils/authApi";
import { defaultAvatarUrl, BASE_URL } from "../config/config"
import ProfileDataContext  from '../contexts/profileDataContext';

function NavbarContainer({ page }) {
  const navigate = useNavigate();
  const { profileData, updateProfileData } = useContext(ProfileDataContext);

  async function getFirstNameAndAvatar() {
    const token = window.localStorage.getItem("token");
    try {
      const response = await getUserDataApi(token);
      updateProfileData("firstName", response.data.fname)
      if (response.data.avatarUrl)
        updateProfileData("avatarUrl", BASE_URL + '/' + response.data.avatarUrl)

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {

    getFirstNameAndAvatar();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const response = await getUserDataApi(token);
        } catch (error) {
          console.error('Error fetching user data:', error);
          logout();
        }
      } else {
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        {profileData["avatarUrl"] && (
          <Image
            src={profileData["avatarUrl"]}
            roundedCircle
            className="rounded-avatar"
            style={{ marginRight: "10px" }}
          />
        )}
        <Navbar.Brand className="welcome-text">Welcome {profileData["firstName"]}!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => navigate('/add-story')}>Create a story</Nav.Link>
            <Nav.Link onClick={() => navigate('/all-stories')}>Read stories</Nav.Link>
            <Nav.Link onClick={() => navigate('/my-stories')}>My stories</Nav.Link>
            <Nav.Link onClick={() => navigate('/update-profile')}>Change my details</Nav.Link>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {page}
    </div>
  );
}

export default NavbarContainer;
