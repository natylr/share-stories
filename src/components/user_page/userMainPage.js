
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav } from "react-bootstrap";
import StoriesCards from "./storiesCards";
import AddStoryForm from "../story_share/addStoryForm";
import { logout } from "../../utils/localStorage";
import StoryForm from "../story_share/StoryForm";
import "../../styles/userMainPage.css";

function UserMainPage({ }) {
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
      } else {
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [currentPage, setCurrentPage] = useState("AllStoriesCards");
  const [storyTitleForEdit, setStoryTitleForEdit] = useState("");

  const createStory = () => {
    setCurrentPage("AddStoryForm");
  };

  const editStory = (title) => {
    setStoryTitleForEdit(title);
    setCurrentPage("EditStory");
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
            <Nav.Link onClick={showAllStories}>Read Stories</Nav.Link>
            <Nav.Link onClick={showMyStories}>My stories</Nav.Link>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "MyStoriesCards" && <StoriesCards cardsType="my_cards" onEdit={editStory} />}
      {currentPage === "AllStoriesCards" && <StoriesCards cardsType="cards" />}
      {currentPage === "AddStoryForm" && <AddStoryForm onFinish={editStory} />}
      {currentPage === "EditStory" && <StoryForm title={storyTitleForEdit} />}
    </div>
  );
}

export default UserMainPage;
