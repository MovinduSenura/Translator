import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    name: "",
    gmail: "",
    phone: "", // Ensure phone is treated as a string
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/feedback/${id}`);
        /* const phone = response.data.data.phone.toString().padStart(10, '0');

    setFeedback({
      ...response.data.data,
      phone: phone,  // Use the phone as a string */
        setFeedback({
          ...response.data.data,
          phone: response.data.data.phone.toString(), // Ensure phone is a string
        });
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback.");
      }
    };

    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(feedback.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Gmail validation (@gmail.com)
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(feedback.gmail)) {
      setError("Email must be a valid Gmail address ending with @gmail.com.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/updatefeedback/${id}`, feedback);
      setSuccess("Feedback updated successfully!");
      setError(""); // Clear the error message if any
      setTimeout(() => navigate("/feedbacks"), 1500);
    } catch (err) {
      console.error("Error updating feedback:", err);
      setError("Failed to update feedback.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Feedback</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={feedback.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="gmail">
            Gmail
          </label>
          <input
            id="gmail"
            type="email"
            name="gmail"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={feedback.gmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={feedback.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={feedback.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
          Update Feedback
        </button>
      </form>
    </div>
  );
};

export default UpdateFeedback;
