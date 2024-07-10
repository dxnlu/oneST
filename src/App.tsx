import "./App.css";
import Home from "./components/Home";
import UENValidator from "./components/UENValidator";
import WeatherForecast from "./components/WeatherForecast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/oneST" element={<Home />} />
          <Route path="/oneST/uen-validator" element={<UENValidator />} />
          <Route path="/oneST/weather-forecast" element={<WeatherForecast />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
