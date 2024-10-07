import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

export default function AddSinAmbiguous() {
  const [sinWord, setSinWord] = useState("");
  const [sameSinWords, setSameSinWords] = useState([""]); // Handle same Sinhala words
  const [engambiWords, setEngambiWords] = useState([""]);
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch existing entries (READ)
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/ambisinwords");
        setEntries(response.data.data);

        console.log("The existing words: ", response.data);
      } catch (error) {
        console.error("Error fetching Sinhala ambiguous words:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleSameSinWordChange = (index, event) => {
    const newSameSinWords = [...sameSinWords];
    newSameSinWords[index] = event.target.value;
    setSameSinWords(newSameSinWords);
  };

  const handleEngambiWordChange = (index, event) => {
    const newEngambiWords = [...engambiWords];
    newEngambiWords[index] = event.target.value;
    setEngambiWords(newEngambiWords);
  };

  const handleAddSameSinField = () => {
    setSameSinWords([...sameSinWords, ""]);
  };

  const handleAddEngambiField = () => {
    setEngambiWords([...engambiWords, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWord = { sinWord, sameSinWords, engambiWords };

    if (editingIndex === null) {
      // Add new entry (CREATE)
      try {
        const response = await axios.post("http://localhost:8000/insertambisinword", newWord);
        setEntries([...entries, response.data]);  // Assuming response returns the new entry
        alert("Added successfully!");
      } catch (error) {
        console.error("Error adding Sinhala ambiguous word:", error);
        alert("Failed to add.");
      }
    } else {
      // Update existing entry
      try {
        const response = await axios.put(
          `http://localhost:8000/updateambisinword/${entries[editingIndex]._id}`,
          newWord
        );
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = response.data;
        setEntries(updatedEntries);
        setEditingIndex(null);
        alert("Updated successfully!");
      } catch (error) {
        console.error("Error updating Sinhala ambiguous word:", error);
        alert("Failed to update.");
      }
    }

    // Clear form
    setSinWord("");
    setSameSinWords([""]);
    setEngambiWords([""]);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setSinWord(entries[index].sinWord);
    setSameSinWords(entries[index].sameSinWords);  // Load sameSinWords for editing
    setEngambiWords(entries[index].engambiWords);
    setEditingIndex(index);
    setIsAdding(true);  // Show form for editing
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`http://localhost:8000/deleteambisinword/${id}`);
      setEntries(entries.filter((_, i) => i !== index));
      alert("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting Sinhala ambiguous word:", error);
      alert("Failed to delete.");
    }
  };

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
    setSinWord("");
    setSameSinWords([""]);  // Reset sameSinWords
    setEngambiWords([""]);
    setEditingIndex(null);  // Reset editing state
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 from-30% to-green-600 flex flex-col items-center p-6">
      <div className="bg-white border-2 border-gray-300 rounded-tr-none rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Manage Sinhala Ambiguous Words</h2>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleAddForm}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            <FaPlus className="mr-2" />
            {isAdding ? "Cancel" : "Add"}
          </button>
        </div>

        {/* Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-2 border">Sinhala Word</th>
              <th className="p-2 border">Same Sinhala Words</th>
              <th className="p-2 border">English Ambiguous Words</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
            entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{entry.sinWord}</td>
                  <td className="p-2 border">{entry.sameSinWords.join(", ")}</td>
                  <td className="p-2 border">{entry.engambiWords.join(", ")}</td>
                  <td className="p-2 border inline-flex w-full space-x-4">
                    <button
                      className="bg-emerald-500 text-white px-5 py-1 rounded-lg hover:bg-emerald-600 w-10/12"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-rose-600 text-white px-5 py-1 rounded-lg hover:bg-rose-700 w-10/12"
                      onClick={() => handleDelete(entry._id, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add/Edit Form */}
        {isAdding && (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sinhala Word</label>
              <input
                type="text"
                value={sinWord}
                onChange={(e) => setSinWord(e.target.value)}
                required
                className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Sinhala word"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Same Sinhala Words</label>
              {sameSinWords.map((word, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => handleSameSinWordChange(index, e)}
                    required
                    className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={`Enter same Sinhala word ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSameSinField}
                className="flex items-center text-green-500 hover:text-green-600 font-semibold"
              >
                <FaPlus className="mr-2" /> Add Another Same Sinhala Word
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                English Ambiguous Words
              </label>
              {engambiWords.map((word, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => handleEngambiWordChange(index, e)}
                    required
                    className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={`Enter English ambiguous word ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEngambiField}
                className="flex items-center text-green-500 hover:text-green-600 font-semibold"
              >
                <FaPlus className="mr-2" /> Add Another English Ambiguous Word
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all"
              >
                {editingIndex !== null ? "Update Word" : "Add Word"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
