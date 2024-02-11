import { useContext } from "react";
import ProfileDataContext from '../contexts/profileDataContext';
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const { updateProfileData } = useContext(ProfileDataContext);

  const logoutFunction = () => {
    window.localStorage.removeItem("token");
    updateProfileData({});
    navigate('/sign-in');
  };

  return logoutFunction;
};

export default useLogout;
