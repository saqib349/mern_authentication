import Login from "./Components/Login";
import { Routes,Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoute";
import RefreshHandler from "./Components/RefreshHandler";

function App() {
 
  return (
    <div className="App">
      <RefreshHandler/>
     <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
     </Routes>
    </div>
  );
}

export default App;
