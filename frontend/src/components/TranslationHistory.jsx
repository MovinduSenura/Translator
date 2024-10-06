import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import NotoSansSinhala from '../fonts/NotoSansSinhala-Regular.ttf';

export default function TranslationHistory() {
  const [translations, setTranslations] = useState([]);
  const navigate = useNavigate();

  
  const userName = localStorage.getItem('userName');

  console.log("User Name of : ", userName);
  
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/allTranslations2/${userName}`);
        
        // Check if response data has AllTranslations
        if (response.data && response.data.data) {
          setTranslations(response.data.data);
        } else {
          console.warn("No translations found in the response.");
          setTranslations([]); // Set to empty array if no translations found
        }
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };
  
    fetchTranslations();
  }, []);
  

  const handleGoBack = () => {
    navigate(`/${userName}`); // Navigate back to TranslationPage
  };

  // Function to generate PDF
  const handleDownloadPDF = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/generateHistoryReport/${userName}`,
        
      );

      const { filepath } = response.data;

      // Create a new <a> element to simulate a download link
      const link = document.createElement("a");
      // Set the href attribute of the link to the filepath of the generated invoice
      link.href = filepath;
      // Set the "download" attribute to specify the default file name for the downloaded file
      link.setAttribute("download", "invoice.pdf");
      // Append the link to the document body
      document.body.appendChild(link);

      // Simulate a click on the link to trigger the download
      link.click();

       // Remove the link from the document body after the download is complete
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading invoice:", error.message);
    }
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
