import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SavedTranslations() {
  const [translations, setTranslations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/allTranslations');
        setTranslations(response.data.AllTranslations);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deleteSavedTranslation/${id}`);
      setTranslations(translations.filter((translation) => translation._id !== id));
      alert('Translation deleted successfully!');
    } catch (error) {
      console.error('Error deleting translation:', error);
      alert('Failed to delete translation.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateTranslationPage/${id}`);
  };

  const handleGoBack = () => {
    navigate('/'); // Navigate back to TranslationPage
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Saved Translations</h2>
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go Back
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Translation</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {translations.map((translation) => (
                <tr key={translation._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{translation.translation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(translation._id)}
                        className="bg-green-700 text-white py-1 px-3 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                        aria-label="Edit Translation"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(translation._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label="Remove Translation"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
