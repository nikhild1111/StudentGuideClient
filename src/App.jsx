import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdmissionPage from './pages/AdmissionPage';
import HostelPage from './pages/HostelPage';
import FoodPage from './pages/FoodPage';
import BooksPage from './pages/BooksPage';
import GroceryPage from './pages/GroceryPage';
import GuidePage from './pages/GuidePage';
import MentorPage from './pages/MentorPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmail from './pages/VerifyEmail';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full bg-richblack-900">

        <Navbar></Navbar>



        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/hostels" element={<HostelPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="verify-email"
            element={

              <VerifyEmail />

            }
          />
        </Routes>

      </div>

    </>
  )
}

export default App
