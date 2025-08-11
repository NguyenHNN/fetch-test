import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./Players";
import Add from "./Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
