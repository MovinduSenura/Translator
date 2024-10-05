import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerticalNavBar from './verticalNavBar.jsx';  
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ViewWordList() {
  const [words, setWords] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/allwords');
        setWords(response.data.data);
      } catch (error) {
        console.error('Failed to fetch words:', error);
      }
    };

    fetchWords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      try {
        await axios.delete(`http://localhost:8000/deleteword/${id}`);
        setWords(words.filter(word => word._id !== id));
        alert('Word deleted successfully.');
      } catch (error) {
        console.error('Failed to delete word:', error);
        alert('Failed to delete word.');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateWord/${id}`); 
  };

  const handleAddNew = () => {
    navigate('/createWord'); 
  };

  /*const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Word List Report", 14, 10);
    
    const headers = [["English Word", "Sinhala Word"]];

    const data = words.map((word) => [
      word.englishWord,
      word.sinhalaWord,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("word_list_report.pdf");
  };*/


  const handleDownloadPDF = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/generateWordListReport",
        
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <VerticalNavBar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">Word List</h2>
            <div>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out mr-4"
              >
                Generate Report
              </button>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ease-in-out"
              >
                Add New Word
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  English Word
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sinhala Word
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {words.map((word) => (
                <tr key={word._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {word.englishWord}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {word.sinhalaWord}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(word._id)}
                      className="text-blue-600 hover:bg-blue-100 hover:text-blue-900 px-4 py-2 border border-blue-300 rounded-md shadow-sm font-semibold transition-colors duration-300 ease-in-out"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(word._id)}
                      className="text-red-600 hover:bg-red-100 hover:text-red-900 px-4 py-2 border border-red-300 rounded-md shadow-sm font-semibold transition-colors duration-300 ease-in-out ml-2"
                    >
                      Delete
                    </button>
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


