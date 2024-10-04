import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NotoSansSinhala from '../fonts/NotoSansSinhala-Regular.ttf';

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

    // Check if translations are available
    if (translations.length === 0) {
        doc.text('No translations available', 14, 22);
        doc.save('translation-history-report.pdf');
        return;
    }

    // Title
    doc.text('Translation History Report', 14, 22);

    // Adding table using autoTable
    doc.autoTable({
        head: [['INPUT', 'OUTPUT']],
        body: translations.map((translation) => [
            translation.english,
            translation.sinhala
        ]),
        startY: 30,
    });

    // Save the document
    doc.save('Translation History Report.pdf');
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Translation History</h2>
          <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white py-2 px-4 ml-[840px] rounded-md"
        >
          Download History Report
        </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Go Back
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">INPUT</th>
                <th className="px-6 py-3 text-left text-xs font-medium">OUTPUT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {translations.map((translation) => (
                <tr key={translation._id}>
                  <td className="px-6 py-4">{translation.english}</td>
                  <td className="px-6 py-4">{translation.sinhala}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <button
          onClick={handleDownloadPDF}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Download History Report
        </button> */}
      </div>
    </div>
  );
}
