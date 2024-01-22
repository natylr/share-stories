import React, { useState } from 'react';
import ProfileDataContext from '../contexts/profileDataContext';

const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});

  const updateProfileData = (key, newValue) => {
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      [key]: newValue,
    }));
  };

  return (
    <ProfileDataContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileDataContext.Provider>
  );
};

export default ProfileDataProvider;
