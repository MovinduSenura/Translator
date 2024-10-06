import React, { useState } from 'react';
import axios from 'axios';
import BgImg from "../images/loginwallpaper.png";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminLogin() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const loginUser = async (e) => {
        e.preventDefault();

        if (!loginData.username || !loginData.password) {
            setError('Username and Password are required.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/adminlogin", loginData);
            const { token, username } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            console.log("Saved Role : ",username)

            alert("Login Successful!");
            navigate(`/admindashboard/${username}`);//linking
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Login Unsuccessful!");
            alert("Login Unsuccessful!");
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-white">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/3 p-10 flex items-center justify-center bg-white shadow-lg">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h2>
                    <form onSubmit={loginUser}>
                        <div>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter username"
                                onChange={handleChange}
                                value={loginData.username}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-5 bg-gray-200" />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                value={loginData.password}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-0 bg-gray-200" />
                        </div>
                        <p className="text-red-500 my-3 mt-2">{error}</p>
                        <button
                            type="submit"
                            className="w-full h-12 font-semibold text-lg px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-600 transition-all mb-2 mt-7">
                            Login
                        </button>
                    </form>
                </div>
            </div>
    
            {/* Right Side - Background Image */}
            <div className="hidden md:block md:w-2/3 bg-cover bg-right" style={{ backgroundImage: `url(${BgImg})` }}>
                {/* Optional content inside the illustration */}
            </div> 
        </div>
    );
    
}
