import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [Filteredfeedbacks, setFilteredfeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/allfeedback`);
        setFeedbacks(response.data.data);
        setLoading(false);

        const filteredFeedbacks = response.data.data.filter(
          (feedback) => feedback.name.toLowerCase() === userName
        )
        setFilteredfeedbacks(filteredFeedbacks);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to load feedbacks.");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Print handler
  const handlePrint = () => {
    window.print(); // Trigger print
  };
  const handleUpdate = (id) => {
    navigate(`/updatefeedback/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:8000/deletefeedback/${id}`);
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      } catch (err) {
        console.error("Error deleting feedback:", err);
        setError("Failed to delete feedback.");
      }
    }
  };

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center text-black print:text-2xl print:font-bold print:text-black">
          Feedback List
        </h2>
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 print:hidden"
        >
          Print
        </button>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider print:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Filteredfeedbacks.length > 0 ? (
              Filteredfeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-ash">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-ash">{feedback.gmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-ash">{feedback.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-ash">{feedback.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2 print:hidden">
                  <button
                      onClick={() => { handleUpdate(feedback._id) }}
                      className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No feedbacks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            /* Hide the print button */
            .print\\:hidden {
              display: none;
            }

            /* Ash color for table data when printing */
            td {
              color: #B2B2B8 !important; /* Ash color */
            }

            /* Ensure black color for table headings */
            th {
              color: #000000 !important; /* Black color for headings */
            }

            /* Ensure the title is printed */
            h2 {
              display: block !important;
            }

            /* Remove background colors */
            table, th, td {
              background: white !important;
            }

            /* Remove margin and padding for cleaner print output */
            body, html {
              margin: 0;
              padding: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserFeedbackList;
