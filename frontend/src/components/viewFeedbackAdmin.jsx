import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerticalNavBar from './verticalNavBar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ViewAllFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/allfeedback");
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:8000/deletefeedback/${id}`);
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        alert("Feedback deleted successfully.");
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        alert("Failed to delete feedback.");
      }
    }
  };



  // Function to generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 14, 10);

    const headers = [["Name", "Gmail", "Phone", "Description", "Reply"]];

    const data = feedbacks.map((feedback) => [
      feedback.name,
      feedback.gmail,
      feedback.phone,
      feedback.description,
      feedback.reply,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("feedback_report.pdf");
  };

  return (
    <div className="flex min-h-screen">
      <VerticalNavBar />

      <div className="flex-1 p-6 bg-gray-100">
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
            <div>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out mr-4"
              >
                Generate Report
              </button>

            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gmail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reply
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feedback.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.gmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.reply || "No reply"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
           
                    <button
                      onClick={() => handleDelete(feedback._id)}
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
