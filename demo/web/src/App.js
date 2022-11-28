import './css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Games from "./pages/games";
import Auth from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
