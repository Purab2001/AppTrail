import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A]">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
