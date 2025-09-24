import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChange, getCurrentUserData, logoutUser } from '../firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        // User is signed in, get additional user data
        try {
          const userData = await getCurrentUserData(user.uid);
          setCurrentUser({ ...user, ...userData });
        } catch (error) {
          console.error("Error getting user data:", error);
          setCurrentUser(user);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = {
    currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};