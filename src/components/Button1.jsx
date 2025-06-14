import React from 'react';
import { NavLink } from 'react-router';

const Button1 = ({ text, to = '#', onClick, className = '' }) => {
    if (onClick && to === '#') {
        return (
            <button
                onClick={onClick}
                className={`btn btn-primary px-10 ${className}`}
            >
                {text}
            </button>
        );
    }

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `btn btn-primary px-10 ${isActive ? 'btn-active' : ''} ${className}`
            }
        >
            {text}
        </NavLink>
    );
};

export default Button1;