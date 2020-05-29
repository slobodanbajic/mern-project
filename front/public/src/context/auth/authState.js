import React, { useReducer } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { CHAGNE_CURRENT_STATUS } from "./authTypes";

const authState = () => {
  const initState = {
    authStatus: false,
    authToken: null,
  };

  const [state, dispath] = useReducer(initState, authReducer);

  const checkCurrentUser = () => {
    let currentToken = localStorage.getItem("token");
    if (currentToken) {
      dispath({
        type: CHAGNE_CURRENT_STATUS,
        payload: true,
      });
      console.log(currentToken);
    }
  };
  return (
    <authContext.Provider
      value={{
        authStatus: state.authStatus,
        authToken: state.authToken,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authState;
