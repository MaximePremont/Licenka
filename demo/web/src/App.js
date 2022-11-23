import './css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Games from "./pages/games";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/games" element={<Games />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
