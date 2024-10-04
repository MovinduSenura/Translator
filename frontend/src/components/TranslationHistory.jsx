import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TranslationHistory() {
  const [translations, setTranslations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/allTranslations2');
        setTranslations(response.data.AllTranslations);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, []);

  const handleGoBack = () => {
    navigate('/'); // Navigate back to TranslationPage
  };

  // Function to generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.text('Translation History Report', 14, 22);

    // Adding table using autoTable
    doc.autoTable({
      head: [['Input', 'Output']],
      body: translations.map((translation) => [
        translation.translation, // Input
        translation.output, // Output (update this with the correct key)
      ]),
      startY: 30, // Adjust the position of the table
    });

    // Save the PDF
    doc.save('translation-history-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Translation History</h2>
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-1"
          >
            Go Back
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {translations.map((translation) => (
                <tr key={translation._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{translation.translation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{translation.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 float-right mr-1 mb-1"
          >
            Download History Report
          </button>
        </div>
      </div>
    </div>
  );
}
