import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// pages/components
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Details from '../pages/Details';
import ReviewCard from './ReviewCard';


export default function Router() {
    const Layout = () => {
        return (
          <>
            <NavBar/>
            <Outlet />
            <Footer />
          </>
        );
      };

      const BrowserRoutes = () => {
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tour/:slug" element={<Details />} />
                <Route path="/tour/:slug/reviews" element={<ReviewCard />} />
                
              </Route>
            </Routes>
          </BrowserRouter>
        );
      };
    
    return <BrowserRoutes />;
}

