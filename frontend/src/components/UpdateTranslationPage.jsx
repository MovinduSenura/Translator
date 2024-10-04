import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Countries from './Countries.jsx';
import { fetchTranslation } from './Script.jsx'; // Import the translation function
import './TranslatorPg.css'; // Import the CSS styles

export default function UpdateTranslationPage() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('si-LK');
  const { id } = useParams(); // Retrieve ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslationData = async () => {
      try {
        console.log(`Fetching translation for ID: ${id}`); // Debugging log
        const response = await axios.get(`http://localhost:8000/allTranslations/${id}`);
        console.log('API Response:', response.data); // Log the response data

        // Access the nested translation
        const translation = response.data.translation.translation; 

        // Check if translation exists
        if (translation) {
          setFromText(translation.english); // Set fromText to the English part
          setToText(translation.sinhala); // Set toText to the Sinhala part
        } else {
          console.error('Translation not found for ID:', id);
        }
      } catch (error) {
        console.error('Error fetching translation:', error.response?.data || error.message);
        alert('Error fetching translation. Please try again later.');
      }
    };

    fetchTranslationData();
  }, [id]);

  const handleTranslate = async () => {
    if (!fromText.trim()) return;

    // Start translating
    setToText("Translating...");

    // Fetch the translation
    const translation = await fetchTranslation(fromText, fromLang, toLang);
    setToText(translation);

    // Save the translation to the history
    const newTranslation = {
      translation: {
        english: fromText,
        sinhala: translation, // assuming Sinhala is the output language
      },
    };

    try {
      await axios.post("http://localhost:8000/inputTranslation2", newTranslation); // This saves the translation
      alert("Translation saved to history!");
    } catch (error) {
      console.error("Error saving translation:", error);
      alert("Failed to save translation to history.");
    }
  };

  const handleInputChange = (e) => {
    setFromText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8000/updateTranslation/${id}`, {
        translation: {
          english: fromText,
          sinhala: toText,
        },
      });
      alert('Updated translation saved successfully!');
      navigate('/savedTranslations'); // Redirect to SavedTranslations page after update
    } catch (error) {
      console.error('Error updating translation:', error);
      alert('Failed to update translation.');
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
              onChange={handleInputChange}
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
            <li className="exchange" onClick={() => {
              setFromText(toText);
              setToText(fromText);
              setFromLang(toLang);
              setToLang(fromLang);
            }}>
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
        <button onClick={handleSubmit} className="favorite-button">Save Changes</button>
      </div>
    </div>
  );
}
