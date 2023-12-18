const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.removeItem("userId")
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("token");
    window.location.href = "/sign-in";
}

const saveUserData = (data) => {
    console.log(data)
    window.localStorage.setItem("userId", data.data.userId)
    window.localStorage.setItem("firstName", data.data.fname);
    window.localStorage.setItem("lastName", data.data.lname);
    window.localStorage.setItem("email", data.data.email);
}

export { logout, saveUserData };