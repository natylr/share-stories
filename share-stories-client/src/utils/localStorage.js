const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.removeItem("token");
    window.location.href = "/";
}


export { logout };