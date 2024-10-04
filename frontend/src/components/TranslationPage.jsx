import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function TranslationPage() {
  const [text, setText] = useState('');
  const [translations, setTranslations] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/inputTranslation', { translation: text });
      alert('Text sent successfully!');
      fetchTranslations(); // Fetch translations after successful submission
    } catch (error) {
      console.error('Error sending text:', error);
      alert('Failed to send text.');
    }
  };

  const handleSubmit2 = async () => {
    try {
      await axios.post('http://localhost:8000/inputTranslation2', { translation: text });
      alert('Translation Completed');
      fetchTranslations(); // Fetch translations after successful submission
    } catch (error) {
      console.error('Error sending text:', error);
      alert('Failed to send text.');
    }
  };

  const handleClear = () => {
    setText('');
  };

  const fetchTranslations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/allTranslations');
      setTranslations(response.data.AllTranslations);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  const fetchTranslations2 = async () => {
    try {
      const response = await axios.get('http://localhost:8000/allTranslations2');
      setTranslations(response.data.AllTranslations);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  const navigateToSavedTranslations = () => {
    navigate('/savedTranslations'); // Navigate to saved translations page
  };

  const navigateToHistory = () => {
    navigate('/translationHistory'); // Navigate to saved translations page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-4 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex">
          {/* Input Form */}
          <div className="flex-1 mr-4 relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Enter Text Here</h2>
            <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
              <div className="mb-4">
                <label htmlFor="translation" className="block text-sm font-medium text-gray-700">Text:</label>
                <input
                  id="translation"
                  type="text"
                  value={text}
                  onChange={handleInputChange}
                  placeholder="Enter your text here"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex space-x-2">
                {/* Translate Button (Unfunctional) */}
                <button
                  onClick={handleSubmit2}
                  // type="button"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  // disabled
                >
                  Translate
                </button>
                {/* Clear Button */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Clear
                </button>
              </div>
            </form>
            {/* Star Button */}
            <button
              onClick={handleSubmit}
              className="absolute top-0 right-0 bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              aria-label="Save Translations"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.27L18.18 21 16.54 14.85 22 10.27H15.81L12 4.8 8.19 10.27H2L7.46 14.85 5.82 21 12 17.27z" />
              </svg>
            </button>
          </div>

          {/* Translations Box */}
          <div className="flex-1 ml-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Translated Text</h2>
            {/* <div className="space-y-2">
              {translations.map((item, index) => (
                <div key={index} className="p-2 border border-gray-300 rounded-md">
                  {item.translation}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Quick Access</h2>
          <button
            onClick={navigateToSavedTranslations}
            className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
          >
            Saved Translations
          </button>
          <button
            onClick={navigateToHistory}
            className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
          >
            Translation History
          </button>
        </div>
      </div>
    </div>
  );
}
