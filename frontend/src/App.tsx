import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="auth" element={<Login />}>
            <Route path="login" element={<Login />} />
            {/* <Route path="new" element={<NewTeamForm />} />
            // <Route index element={<LeagueStandings />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
