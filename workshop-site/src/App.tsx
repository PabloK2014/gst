import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Workshop from './pages/Workshop'
import WeldingWorkshop from './pages/WeldingWorkshop'
import MasonryWorkshop from './pages/MasonryWorkshop'
import CarpentryWorkshop from './pages/CarpentryWorkshop'
import PlumbingWorkshop from './pages/PlumbingWorkshop'
import CulinaryWorkshop from './pages/CulinaryWorkshop'
import Admin from './pages/Admin'
import UserOrders from './pages/UserOrders'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

import ScrollToTop from './components/ScrollToTop'

function App() {
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-900">
        <Header />
        <div className="flex flex-1">
          <Sidebar  />
          <main className="flex-1 bg-gray-900">
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workshop/:category" element={<Workshop />} />
              <Route path="/welding-workshop" element={<WeldingWorkshop />} />
              <Route path="/masonry-workshop" element={<MasonryWorkshop />} />
              <Route path="/carpentry-workshop" element={<CarpentryWorkshop />} />
              <Route path="/plumbing-workshop" element={<PlumbingWorkshop />} />
              <Route path="/culinary-workshop" element={<CulinaryWorkshop />} />
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