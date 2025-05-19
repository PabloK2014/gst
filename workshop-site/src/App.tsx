import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Workshop from './pages/Workshop'
import Admin from './pages/Admin'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'
import UserOrders from './pages/UserOrders'


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-900">
        <Header />
        <div className="flex flex-1">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workshop/:category" element={<Workshop />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
