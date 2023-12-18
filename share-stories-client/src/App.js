import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import StoriesCards from "./components/user_page/storiesCards";
import StoryEditor from "./components/story_share/storyEditor";
import AddStoryForm from "./components/story_share/addStoryForm";
import UpdateProfile from "./components/user_page/updateProfile"
import NavbarContainer from "./components/user_page/navbarContainer";
import ChangePassword  from "./components/user_page/changePassword";
import StoryView from './components/story_share/storyView'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Navigate to="/all-stories" />: <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/all-stories" element={<NavbarContainer page={<StoriesCards cardsType="cards"/>} />} />
          <Route path="/my-stories" element={<NavbarContainer page={<StoriesCards cardsType="my_cards"/>} />} />
          <Route path="/edit-story/:title" element={<NavbarContainer page={<StoryEditor/>} />} />
          <Route path="/view-story/:title" element={<NavbarContainer page={<StoryView/>} />} />
          <Route path="/add-story" element={<NavbarContainer page={<AddStoryForm />} />} />
          <Route path="/update-profile" element={<NavbarContainer page={<UpdateProfile />} />} />
          <Route path="/change-password" element={<NavbarContainer page={<ChangePassword />} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
