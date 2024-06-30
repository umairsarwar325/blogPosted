import React from "react";
import { Header, } from "./components/index";
import {Outlet} from 'react-router-dom'
import { Button } from "./components/index";
import databaseAndStorageService from "./firebase/config";

const App = () => {
  
  return (
    <div className="bg-zinc-700 h-screen overflow-hidden">
      <Header></Header>
      <Outlet/>
    </div>
  );
};

export default App;
