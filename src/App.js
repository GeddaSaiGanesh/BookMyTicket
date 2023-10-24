import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="bg-container">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
