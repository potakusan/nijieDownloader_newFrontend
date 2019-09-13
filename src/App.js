import React from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./theme/common.css";
import "react-image-lightbox/style.css";

import Test from "./components/test";

import MainContent from "./route";
//import store from "./redux/index";
//import { Provider, connect } from 'react-redux';

function App() {
  // dummy data
  return (
    <div className="App">
      <BrowserRouter>
        <MainContent/>
        <Test/>
      </BrowserRouter>
    </div>
  );
}

export default App;
