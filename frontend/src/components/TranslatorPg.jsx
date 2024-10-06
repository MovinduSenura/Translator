import React, { useState } from "react";
import "./TranslatorPg.css";
import Countries from "./Countries.jsx";
import { fetchTranslation } from "./Script.jsx"; // Import fetchTranslation function
import axios from "axios"; // Import axios for API calls
import { useNavigate } from 'react-router-dom';

const TranslatorPg = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("si-LK");
  const navigate = useNavigate(); // Hook for navigation

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  // Modified handleTranslate function
  const handleTranslate = async () => {
    if (!fromText.trim()) return;

    // Start translating
    setToText("Translating...");

    // Fetch the translation
    const translation = await fetchTranslation(fromText, fromLang, toLang);
    setToText(translation);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeech = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  // const handleFavorite = () => {
  //   if (!fromText.trim() || !toText.trim()) return;

  //   const favoriteTranslation = {
  //     translation: {
  //       english: fromText,
  //       sinhala: toText,
  //     },
  //   };

  //   try {
  //     await axios.post("http://localhost:8000/inputTranslation", favoriteTranslation);
  //     alert("Translation saved as favorite!");
  //   } catch (error) {
  //     console.error("Error saving translation:", error);
  //     alert("Failed to save translation.");
  //   }
  // };

  const directToLoginPage = () => {
    navigate('/login'); // Navigate to login page
  };

  const navigateToSavedTranslations = () => {
    navigate('/savedTranslations'); // Navigate to saved translations page
  };

  const navigateToHistory = () => {
    navigate('/translationHistory'); // Navigate to history page
  };

  return (
    <div className="translator-page">
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
                <i className="fas fa-volume-up" onClick={() => handleSpeech(fromText, fromLang)}></i>
                <i className="fas fa-copy" onClick={() => handleCopy(fromText)}></i>
              </div>
              <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
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
              <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
                {Object.entries(Countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <i className="fas fa-volume-up" onClick={() => handleSpeech(toText, toLang)}></i>
                <i className="fas fa-copy" onClick={() => handleCopy(toText)}></i>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate} className="translate-button">Translate Text</button>
        <button onClick={directToLoginPage} className="favorite-button">
          ★ Save as Favorite
        </button>
        <p className="text-right mt-1"><a className='text-slate-500 hover:underline' href="/login">Send feedback</a></p>
      </div>
    </div>
  );
};

export default TranslatorPg;
