import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import UserMainPage from "./components/user_page/userMainPage";
import StoryForm from "./components/story_share/StoryForm";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <UserMainPage /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-page" element={<UserMainPage />} />
          <Route path="/edit-story" element={<StoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;