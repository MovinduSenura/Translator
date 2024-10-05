import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import VerticalNavBar from './verticalNavBar.jsx'; // Import the vertical navbar component

export default function CreateAdmin() {
  const [adminData, setAdminData] = useState({
    adminID: '',
    adminName: '',
    adminEmail: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/createadmin', adminData);
      alert(response.data.message);
  
      setAdminData({
        adminID: '',
        adminName: '',
        adminEmail: '',
        username: '',
        password: '',
      });
      navigate('/viewAllAdmins');
    } catch (error) {
      console.error(error);
      alert('Failed to create admin.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <VerticalNavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Create Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminID" className="block text-sm font-medium text-gray-600">Admin ID</label>
              <input
                type="text"
                id="adminID"
                name="adminID"
                value={adminData.adminID}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-gray-600">Admin Name</label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                value={adminData.adminName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-600">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={adminData.adminEmail}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={adminData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={adminData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
