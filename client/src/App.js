import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Search from "./components/search.js";
import Course from "./components/course.js";
import Spk from "./components/spk.js";
import Subject from "./components/subject.js";
import Footer from "./components/footer";

const App = () => {
  return(
    <div>
      <header>
        <Navbar />
      </header>
      <main role="main" className="mt-3" style={{"minHeight": 700}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/spk/:id" element={<Spk />} />
          <Route path="/subject/:id" element={<Subject />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;