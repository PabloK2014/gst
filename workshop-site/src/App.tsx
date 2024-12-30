import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Workshop from './pages/Workshop'
import Admin from './pages/Admin'
import Orders from './pages/Orders'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-900">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workshop/:category" element={<Workshop />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
