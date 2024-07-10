import "./App.css";
import Home from "./components/Home";
import UENValidator from "./components/UENValidator";
import WeatherForecast from "./components/WeatherForecast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uen-validator" element={<UENValidator />} />
          <Route path="/weather-forecast" element={<WeatherForecast />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
