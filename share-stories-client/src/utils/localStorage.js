
const logout = () => {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.removeItem("token");   
};


export { logout };