import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userToken, setToken] = useState(null);

  const userIsLoggedIn = !!userToken;

  const loginHandler = (token) => {
    console.log("token : " + token);
    setToken(token);
    console.log("called");
    console.log(userToken);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: userToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;