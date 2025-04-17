import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <Routes>

      <Route
        index
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />

    </Routes>
  )
}

export default App
