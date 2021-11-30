import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import HeroView from "./Components/HeroView";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/hero/:id" element={<HeroView />} />
    </Routes>
  );
};

export default App;
