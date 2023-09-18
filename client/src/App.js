import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Search from "./components/search.js";
import Course from "./components/course.js";
import Spk from "./components/spk.js";
import Subject from "./components/subject.js";

const App = () => {
  return(
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/spk/:id" element={<Spk />} />
        <Route path="/subject/:id" element={<Subject />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;