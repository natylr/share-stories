import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StoriesCards from "./storiesCards";
import AddStoryForm from "../story_share/addStoryForm";
import { useDispatch, useSelector } from 'react-redux';
import logout from "../../utils/loaclStorage"

import "../../styles/userMainPage.css";

function UserMainPage({firstName}) {
  const [currentPage , setCurrentPage] = useState("StoriesCards");
  const navigate = useNavigate(); 

  // const logOut = () => {
  //   window.localStorage.removeItem("token");
  //   window.localStorage.removeItem("loggedIn");
  //   navigate("/sign-in");
  // };

  const createStory = () => {
    setCurrentPage("AddStoryForm");
  };

  const showMyStories = () => {
    setCurrentPage("StoriesCards");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="welcome-text">Welcome {firstName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={createStory}>Create a Story</Nav.Link>
            <Nav.Link onClick={showMyStories}>My stories</Nav.Link>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "StoriesCards" && <StoriesCards />}
      {currentPage === "AddStoryForm" && <AddStoryForm />}
    </div>
  );
}
const mapStateToProps = (state) => ({
  firstName: state.user.firstName
  // lastName: state.lastName,
  // email: state.email
});

export default connect(mapStateToProps)(UserMainPage);