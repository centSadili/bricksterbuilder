import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Discover from "./components/Discover/Discover";
import Home from "./components/Home/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
     
    </Router>
  );
}

export default App;
