import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateWord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [englishWord, setEnglishWord] = useState('');
  const [sinhalaWord, setSinhalaWord] = useState('');

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/word/${id}`);
        setEnglishWord(response.data.data.englishWord);
        setSinhalaWord(response.data.data.sinhalaWord);
      } catch (error) {
        console.error('Failed to fetch word:', error);
      }
    };

    fetchWord();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/updateword/${id}`, { englishWord, sinhalaWord });
      alert('Word updated successfully');
      navigate('/viewWordslist');
    } catch (error) {
      console.error('Failed to update word:', error);
      alert('Failed to update word');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Update Word</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="englishWord" className="block text-sm font-medium text-gray-600">English Word</label>
            <input
              type="text"
              id="englishWord"
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="sinhalaWord" className="block text-sm font-medium text-gray-600">Sinhala Word</label>
            <input
              type="text"
              id="sinhalaWord"
              value={sinhalaWord}
              onChange={(e) => setSinhalaWord(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Word
          </button>
        </form>
      </div>
    </div>
  );
}
