import { Routes, Route, Navigate } from "react-router-dom"

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
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App
