import React from "react";
import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AudioConvert from "./components/AudioConvert";
import DualAudio from "./components/DualAudio";
import Home from "./components/Home";
import ImageConvert from "./components/ImageConvert";
import Footer from "./components/nav/Footer";
import Header from "./components/nav/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audio-convert" element={<AudioConvert />} />
          <Route path="/audio-merge" element={<DualAudio />} />
          <Route path="/image-convert" element={<ImageConvert />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
