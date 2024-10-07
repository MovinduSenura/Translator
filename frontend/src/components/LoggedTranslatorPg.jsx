import React, { useEffect, useState } from "react";
import "./TranslatorPg.css";
import Countries from "./Countries.jsx";
import { fetchTranslation } from "./Script.jsx"; // Import fetchTranslation function
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoggedTranslatorPg = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("si-LK");
  const navigate = useNavigate(); // Hook for navigation

  const userName = localStorage.getItem("userName");
  
  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  // Updated handleTranslate function
  const handleTranslate = async () => {
    if (!fromText.trim()) return;

    setToText("Translating...");

    // Fetch the translation
    const translation = await fetchTranslation(fromText, fromLang, toLang);
    setToText(translation);

    // Save the translation to the history array
    const newTranslationsArray = [
      {
        english: fromText,
        sinhala: translation, // Assuming Sinhala is the output language
      },
    ];

    try {
      const newTranslationHistory = {
        username: userName,
        translationHistory: newTranslationsArray, // Sending an array of translations
      };

      await axios.post("http://localhost:8000/inputTranslation2", newTranslationHistory); // Adjusted API call
      alert("Translation saved to history!");
    } catch (error) {
      console.error("Error saving translation:", error);
      alert("Failed to save translation to history.");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeech = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const handleFavorite = async () => {
    if (!fromText.trim() || !toText.trim()) return;

    const favoriteTranslation = {
      username: userName,
      savedtranslation: [
        {
          english: fromText,
          sinhala: toText,
        },
      ],
    };

    try {
      await axios.post("http://localhost:8000/inputTranslation", favoriteTranslation);
      alert("Translation saved as favorite!");
    } catch (error) {
      console.error("Error saving translation:", error);
      alert("Failed to save translation.");
    }
  };

  const navigateToSavedTranslations = () => {
    navigate("/savedTranslations"); // Navigate to saved translations page
  };

  const navigateToHistory = () => {
    navigate("/translationHistory"); // Navigate to history page
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    window.location.href = '/';
};

  return (
    <div className="translator-page">
      <h2 className="font-bold text-slate-600 text-4xl mt-14 -ml-64" style={{position: "absolute"}}>Welcome {userName}</h2>
      <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter text"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>
            <textarea
              spellCheck="false"
              className="to-text"
              placeholder="Translation"
              value={toText}
              readOnly
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i
                  className="fas fa-volume-up"
                  onClick={() => handleSpeech(fromText, fromLang)}
                ></i>
                <i
                  className="fas fa-copy"
                  onClick={() => handleCopy(fromText)}
                ></i>
              </div>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
              >
                {Object.entries(Countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange" onClick={handleExchange}>
              <i className="fas fa-exchange-alt"></i>
            </li>
            <li className="row to">
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
              >
                {Object.entries(Countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <i
                  className="fas fa-volume-up"
                  onClick={() => handleSpeech(toText, toLang)}
                ></i>
                <i
                  className="fas fa-copy"
                  onClick={() => handleCopy(toText)}
                ></i>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate} className="translate-button">
          Translate Text
        </button>
        <button onClick={handleFavorite} className="favorite-button">
          ★ Save as Favorite
        </button>
        <p className="text-right mt-1"><a className='text-slate-500 hover:underline' href="/createfeedback">Send feedback</a></p>
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
          <button
              onClick={handleLogout}
              className="mt-[500px] w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedTranslatorPg;