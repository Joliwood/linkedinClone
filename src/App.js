import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.js";
import Home from "./components/Home";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/home"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
