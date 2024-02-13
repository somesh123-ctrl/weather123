import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Descriptions from "./components/Descriptions";
import Details from "./Details";
import Demo from "./Demo";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        {/* <Route path="/details" element={<Demo />} /> */}
      </Routes>
    </div>
  );
}

export default App;
