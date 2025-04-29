import { Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Layout from "./components/layout/Layout"
import AccountRecovery from "./pages/AccountRecovery"

function App() {

  return (
    <Routes>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* all other protected routes */}
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/accountRecovery" element={<AccountRecovery />} />
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App
