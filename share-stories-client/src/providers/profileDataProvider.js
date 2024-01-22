import React, { useState } from 'react';
import ProfileDataContext from '../contexts/profileDataContext';

const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});

  const updateProfileData = (key, newValue) => {
    const updatedProfileData = { ...profileData, [key]: newValue };

    setProfileData(updatedProfileData);
  };

  return (
    <ProfileDataContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileDataContext.Provider>
  );
};

export default ProfileDataProvider;
