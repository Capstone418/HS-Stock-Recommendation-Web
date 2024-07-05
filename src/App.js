/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
}*/

/*
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('/api/data')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
  }, []);

  return (
      <div>
        받아온 값: {data}
      </div>
  );
}
*/

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./page/Home";
import React from "react";
import PriceMenu from "./page/PriceMenu";
import PriceDetail from "./page/PriceDetail";
import Dash from "./page/Dash";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import ChatBot from "./page/ChatBot"
import Community from "./page/Community"
import UserProfile from "./page/UserProfile";
import MyPage from "./page/MyPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Dash />} />
                <Route path={"recommend"} element={<Home/>}/>
                <Route path={"price-menu"} element={<PriceMenu/>} />
                <Route path={"price-detail"} element={<PriceDetail/>} />
                <Route path={"login"} element={<Login/>} />
                <Route path={"signup"} element={<SignUp/>} />
                <Route path={"chatbot"} element={<ChatBot/>} />
                <Route path={"community"} element={<Community/>} />
                <Route path={"user/:username"} element={<UserProfile/>} />
                <Route path={"mypage"} element={<MyPage/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
