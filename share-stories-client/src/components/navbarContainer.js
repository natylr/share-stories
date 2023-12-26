
import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import "../styles/navbarContainer.css";
import { getUserDataApi } from "../utils/authApi";

function NavbarContainer({ page }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  useEffect(() => {
    async function getFirstName() {
      const token = window.localStorage.getItem("token");
      try {
        const response = await getUserDataApi(token);

        if (response.data === "Invalid Token") {
          logout();
        } else {
          setFirstName(response.data.fname);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getFirstName();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const response = await getUserDataApi(token);
          
          if (response.data === "Invalid Token") {
            logout();
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
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
        <Navbar.Brand className="welcome-text">Welcome {firstName}!</Navbar.Brand>
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
