import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './css/App.css';
import Navbar from './components/Navbar';
import RoutesList from './components/RoutesList';
import BookishAPI from './BookishAPI';
import UserContext from './components/auth/UserContext';
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState({
    data: null,
    loadedUser: false,
  });
  const [token, setToken] = useLocalStorage('bookish-token');


  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        BookishAPI.token = token;
        let { username } = jwtDecode(token);
        let user = await BookishAPI.getUser(username);
        if (user) {
          setCurrUser({
            data: user,
            loadedUser: true,
          });
          setIsLoggedIn(true);
        }
      } else {
        setCurrUser({
          data: null,
          loadedUser: true,
        });

      }
    }
    getCurrUser();
  }, [token]);


  function logout() {
    setCurrUser({
      data: null,
      loadedUser: false,
    });
    setToken(null);
    setIsLoggedIn(false);
  }

  async function login(data) {
    let token = await BookishAPI.login(data);
    setToken(token);
  }

  async function signup(data) {
    const token = await BookishAPI.signup(data);
    setToken(token);
  }

  return (
    <UserContext.Provider
      value={{
        currUser: currUser.data,
        setCurrUser
      }}>
      < div className="App">
        <BrowserRouter>
          <Navbar logout={logout} isLoggedIn={isLoggedIn} />
          <RoutesList currUser={currUser.data} login={login} signup={signup} isLoggedIn={isLoggedIn} />
        </BrowserRouter>
      </div >
    </UserContext.Provider >
  );
}

export default App;
