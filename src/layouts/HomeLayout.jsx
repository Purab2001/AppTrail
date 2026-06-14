import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import ScrollToTop from '../components/ScrollToTop';
import ScrollToTopOnRoute from '../components/ScrollToTopOnRoute';

const HomeLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#0A0A0A]">
            <SmoothScroll />
            <ScrollToTopOnRoute />
            <Navbar />
            <main className="flex-grow pt-16 sm:pt-[72px]">
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default HomeLayout;
