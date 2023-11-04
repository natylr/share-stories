import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StoriesCards from "./storiesCards";
import AddStoryForm from "../story_share/addStoryForm";
import { useDispatch, useSelector } from 'react-redux';
import "../../styles/userMainPage.css";

function UserMainPage({firstName}) {
  const firstNamestate = useSelector(state => state.user.firstName);
  alert(firstNamestate)
  // const [userData, setUserData] = useState("");
  const [currentPage , setCurrentPage] = useState("StoriesCards");
  const navigate = useNavigate(); 
  // useEffect(() => {
  //   fetch("http://localhost:5000/user/user-data", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       token: window.localStorage.getItem("token"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.data === "Invalid Token") {
  //         alert("Token expired, please login again");
  //         window.localStorage.removeItem("token");
  //         window.localStorage.removeItem("loggedIn");
  //         navigate("/sign-in"); 
  //       } else {
  //         alert(data.data.fname)
  //       }
  //     });
  // }, [navigate]);

  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    navigate("/sign-in");
  };

  const createStory = () => {
    setCurrentPage("AddStoryForm");
  };

  const showMyStories = () => {
    setCurrentPage("StoriesCards");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="welcome-text">Welcome {firstNamestate}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={createStory}>Create a Story</Nav.Link>
            <Nav.Link onClick={showMyStories}>My stories</Nav.Link>
            <Nav.Link onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "StoriesCards" && <StoriesCards />}
      {currentPage === "AddStoryForm" && <AddStoryForm />}
    </div>
  );
}
const mapStateToProps = (state) => ({
  firstName: state.firstName
  // lastName: state.lastName,
  // email: state.email
});

export default connect(mapStateToProps)(UserMainPage);