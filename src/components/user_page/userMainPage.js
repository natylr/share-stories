import React, {useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav} from "react-bootstrap";
import StoriesCards from "./storiesCards";
import AddStoryForm from "../story_share/addStoryForm";
import ParagraphFrame from "../story_share/paragraphFrame"
import {logout} from "../../utils/localStorage"

import "../../styles/userMainPage.css";


function UserMainPage({}) {
  useEffect(() => {
    const interval = setInterval(() => {
      const token = window.localStorage.getItem("token");
  
      if (token) {
        fetch("http://localhost:5000/user/user-data", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.data === "Invalid Token") {
            logout();
          }
        });
      }
    }, 1000);
  
    return () => clearInterval(interval); 
  }, []);
  
  const [currentPage , setCurrentPage] = useState("AllStoriesCards");

  const createStory = () => {
    setCurrentPage("AddStoryForm");
  };

  const showMyStories = () => {
    setCurrentPage("MyStoriesCards");
  };

  const showAllStories = () => {
    setCurrentPage("AllStoriesCards");
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="welcome-text">Welcome {window.localStorage.getItem("firstName")}!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={createStory}>Create a Story</Nav.Link>
            <Nav.Link onClick={showAllStories}>All The Stories</Nav.Link>
            <Nav.Link onClick={showMyStories}>My stories</Nav.Link>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "MyStoriesCards" && <StoriesCards cards_type= "my_cards" />}
      {currentPage === "AllStoriesCards" && <StoriesCards cards_type= "cards" />}
      {currentPage === "AddStoryForm" && <AddStoryForm />}
    </div>
  );
}
export default UserMainPage;