const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.removeItem("first_name");
    window.localStorage.removeItem("last_name");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("token");
    window.location.href = "/sign-in";
}

const saveUserData = (data) => {
    window.localStorage.setItem("first_name", data.data.fname);
    window.localStorage.setItem("last_name", data.data.lname);
    window.localStorage.setItem("email", data.data.email);
}

export { logout, saveUserData };