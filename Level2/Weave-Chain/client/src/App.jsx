import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import TraceProduct from './pages/TraceProduct'
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/market" element={<Market />} />
      <Route path="/trace-product" element={<TraceProduct />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App