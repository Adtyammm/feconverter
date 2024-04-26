import React from "react";
import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AudioConvert from "./components/AudioConvert";
import AudioMerge from "./components/AudioMerge";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import ImageConvert from "./components/ImageConvert";
import ImageDisplay from "./components/image";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audio-convert" element={<AudioConvert />} />
          <Route path="/audio-merge" element={<AudioMerge />} />
          <Route path="/image-convert" element={<ImageConvert />} />
          <Route path="/asd" element={<ImageDisplay />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
