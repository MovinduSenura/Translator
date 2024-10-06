import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const CreateFeedback = () => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);  // Added loading state
  
  const form = useRef();
  const navigate = useNavigate();

  const validateForm = () => {
    if (phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(gmail)) {
      setError("Email must be a valid Gmail address.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);  // Start loading
    const feedbackData = { name, gmail, phone, description };

    try {
      const response = await fetch("http://localhost:8000/createfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Feedback created and email sent successfully!");

        // Send email using emailjs
        emailjs.sendForm('service_egpzsxm', 'template_xev4fll', form.current, 'ao9O4f46wTktLM_dV')
          .then(() => console.log('Email sent successfully'))
          .catch((error) => console.log('Email sending failed:', error.text));

        // Reset form fields
        setName(""); setGmail(""); setPhone(""); setDescription("");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to create feedback.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form ref={form} onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Feedback</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{success}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
          <input
            id="name" type="text" name="user_name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={name} onChange={(e) => setName(e.target.value)} required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="gmail">Gmail</label>
          <input
            id="gmail" type="email" name="user_email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={gmail} onChange={(e) => setGmail(e.target.value)} required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">Phone Number</label>
          <input
            id="phone" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={phone} onChange={(e) => setPhone(e.target.value)} required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description" name="message" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={description} onChange={(e) => setDescription(e.target.value)} required
          ></textarea>
        </div>

        <button
          type="submit" className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default CreateFeedback;
