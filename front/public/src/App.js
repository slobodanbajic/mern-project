import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import authContext from "./context/auth/authContext";

function App() {
  const AuthContext = useContext(authContext);
  console.log(authContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{}</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;