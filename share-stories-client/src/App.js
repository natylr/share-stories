import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import StoriesCards from "./components/view/storiesCards";
import StoryEditor from "./components/edit/storyEditor";
import AddStoryForm from "./components/edit/addStoryForm";
import UpdateProfile from "./components/setting/updateProfile"
import NavbarContainer from "./components/navbarContainer";
import ChangePassword  from "./components/setting/changePassword";
import StoryView from './components/view/storyView'
import Background from "./utils/background"

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Background/>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Navigate to="/all-stories" />: <SignIn />}
          />
          <Route path="/sign-in" element={<SignIn />} />
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
