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
  const { index } = useParams(); // Retrieve both ID and index from the URL
  const navigate = useNavigate();

  const [translations, setTranslations] = useState([]);
  const [docID, setDocID] = useState("");
  
  const userName = localStorage.getItem("userName");

  console.log("User Name is : ", userName);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/allTranslations/${userName}`);
        setTranslations(response.data.AllTranslations);
        setDocID(response.data.documentId);
        console.log("Translations:", response.data.documentId);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    };

    fetchTranslations();
  }, [userName]);

  console.log("Document ID :", docID);

  useEffect(() => {
    const fetchTranslationData = async () => {
      if (!docID || !index) return; // Ensure both are available before fetching
      try {
        console.log(`Fetching translation for ID: ${docID} and Index: ${index}`); // Debugging log
  
        const response = await axios.get(`http://localhost:8000/allTranslations/${docID}/${index}`);
        console.log('API Response:', response.data); // Log the response data
  
        const translation = response.data.savedtranslation; // Assuming response includes the translation directly

        console.log('Translation:', translation);
  
        if (translation) {
          setFromText(translation.english);
          setToText(translation.sinhala);
        } else {
          console.error('Translation not found for ID and Index:', docID, index);
        }
      } catch (error) {
        console.error('Error fetching translation:', error.response?.data || error.message);
        alert('Error fetching translation. Please try again later.');
      }
    };
  
    fetchTranslationData();
  }, [docID, index]);

  const handleTranslate = async () => {
    if (!fromText.trim()) return;

    setToText("Translating...");

    const translation = await fetchTranslation(fromText, fromLang, toLang);
    setToText(translation);

    // Save the translation to the history array
    const newTranslationsArray = [
      {
        english: fromText,
        sinhala: translation, // Assuming Sinhala is the output language
      },
    ];

    const newTranslation = {
      username: userName,
      translationHistory: newTranslationsArray, 
    };

    try {
      await axios.post("http://localhost:8000/inputTranslation2", newTranslation);
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
      // Change to fit the expected structure for the update API
      await axios.patch(`http://localhost:8000/updateTranslation/${docID}/${index}`, {
        username: userName, // Include the username if needed
        savedtranslation: [{
          english: fromText,
          sinhala: toText,
        }],
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
