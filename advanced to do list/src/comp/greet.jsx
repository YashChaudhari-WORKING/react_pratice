import React, { useContext } from 'react';
import UserContext from '../';

const UserProfile = () => {
  const userName = useContext(UserContext);
  return <p>Welcome to your profile, {userName}!</p>;
};

export default UserProfile;