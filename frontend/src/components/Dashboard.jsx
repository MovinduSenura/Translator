import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const fetchData = async () => {
                try {
                    const response = await axios.post(`http://localhost:8000/user/${userId}`);
                    setUser(response.data.user);
                } catch (err) {
                    setError("Failed to fetch user data.");
                }
            };

            fetchData();
        } catch (err) {
            setError("Failed to decode token.");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <p className="text-gray-700 text-lg font-medium">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome, {user.userName}</h1>
                <div className="flex justify-center mb-6">
                    {user.profilePicture && (
                        <img 
                            src={user.profilePicture} 
                            alt="Profile" 
                            className="h-24 w-24 rounded-full border-2 border-gray-300 shadow-sm" 
                        />
                    )}
                </div>
                <p className="text-gray-600 text-md text-center mb-6">Email: {user.email}</p>
                <div className="flex justify-between mb-6">
                    <Link 
                        to="/createfeedback" 
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
                    >
                        Create Feedback
                    </Link>
                    <Link 
                        to="/" 
                        className="px-4 py-2 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition duration-200"
                    >
                        Edit Feedback
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-gray-500 text-white text-lg font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
