import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { checkAuthOnAppLoad } from "./services/operations/authAPI"
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
import Admin from "../src/pages/Admin";
import Hostel from "../src/components/Admin/Hostels";
import GuideApplication from "../src/components/Guide/Guideapplication"
import ApplyMentorForm from "../src/components/Mentor/ApplyMentorForm";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Profile  from './pages/Profile';


function App() {

  const dispatch=useDispatch();
  const [count, setCount] = useState(0);
    const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkAuthOnAppLoad(navigate))
  }, [])
  return (
    <>
      <div className="w-full bg-richblack-900 pt-16">

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/hos" element={<Hostel />} />
          <Route path="/profile" element={<Profile  />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/guideapplication" element={<GuideApplication />} />
          <Route path="/ApplyMentorForm" element={<ApplyMentorForm />} />
          
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
