import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Discover from "./components/Discover/Discover";
import Home from "./components/Home/Home";
import Trending from "./components/Trending/Trending";
import Universe from "./components/Universe/Universe";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/universe" element={<Universe />} />
      </Routes>
     
    </Router>
  );
}

export default App;
