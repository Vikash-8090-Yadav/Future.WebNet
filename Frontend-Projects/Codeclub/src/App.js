import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Resources from "./components/Resources"
import Blogs from "./components/Blogs"
import Contact from "./components/Contact"
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home/>} />    
        <Route exact path="/resources" element={<Resources/>} />    
        <Route exact path="/blogs" element={<Blogs/>} />
        <Route exact path="/contact" element={<Contact/>} /> 
      </Routes>
      <Home/>
      <About/>
      <Resources/>
      <Blogs/>
      <Contact/>
    </Router>
  );
}

export default App;
