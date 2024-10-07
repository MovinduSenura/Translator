import React, { useState, useEffect } from "react";
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
  const [ambiEngWords, setAmbiEngWords] = useState([]);
  const [ambiSinWords, setAmbiSinWords] = useState([]);
  const [sameEngWords, setSameEngWords] = useState([]); // New state for same English words
  const [sameSinWords, setSameSinWords] = useState([]); // New state for same Sinhala words
  const [showAmbiPopup, setShowAmbiPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [matchedAmbiWords, setMatchedAmbiWords] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (showAmbiPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100); // Delay before showing, adjust as needed
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      setIsVisible(false); // Hide if condition is false
    }
  }, [showAmbiPopup]);

  // Fetch ambiguous words (both English and Sinhala)
  useEffect(() => {
    const fetchAmbiWords = async () => {
      try {
        const engResponse = await axios.get("http://localhost:8000/ambiengwords");
        setAmbiEngWords(engResponse.data.data);  // Set English ambiguous words

        const sinResponse = await axios.get("http://localhost:8000/ambisinwords");
        setAmbiSinWords(sinResponse.data.data);  // Set Sinhala ambiguous words

        console.log("Fetched Ambiguous Words:", {
          english: engResponse.data.data,
          sinhala: sinResponse.data.data,
        });
      } catch (error) {
        console.error("Error fetching ambiguous words:", error);
      }
    };

    fetchAmbiWords();
  }, []);

  const checkAmbiguity = (inputText, lang) => {
    const words = inputText.split(" ");
    const lastWord = words[words.length - 1]; // Get the last word entered

    if (lang === "en-GB") {
      const foundEngAmbiguousWord = ambiEngWords.find(
        (wordObj) => wordObj.engWord === lastWord
      );
      if (foundEngAmbiguousWord) {
        setSameEngWords(foundEngAmbiguousWord.sameEngWords || []); // Set same English words
        setShowAmbiPopup(true);
        console.log("Ambiguity found in English:", lastWord);
        return;
      }
    } else if (lang === "si-LK") {
      const foundSinAmbiguousWord = ambiSinWords.find(
        (wordObj) => wordObj.sinWord === lastWord
      );
      if (foundSinAmbiguousWord) {
        setSameSinWords(foundSinAmbiguousWord.sameSinWords || []); // Set same Sinhala words
        setShowAmbiPopup(true);
        console.log("Ambiguity found in Sinhala:", lastWord);
        return;
      }
    }

    setShowAmbiPopup(false);
    console.log("No ambiguous word found.");
  };


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
          <div className="text-input relative">
            {showAmbiPopup && (
              <div className="relative flex justify-center">
                <div
                  className={`absolute -top-20 flex flex-col items-center transition-all duration-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  <div className="w-40 bg-slate-100 rounded-lg text-center grid grid-cols-1 gap-1">
                    {matchedAmbiWords.map((word, index) => (
                      <React.Fragment key={`matched-${index}`}>
                        <button className="py-1">
                          {word}
                        </button>
                        <hr />
                      </React.Fragment>
                    ))}
                    {sameEngWords.map((word, index) => (
                      <React.Fragment key={`same-eng-${index}`}>
                        <button className="py-1">
                          {word}
                        </button>
                        <hr />
                      </React.Fragment>
                    ))}
                    {sameSinWords.map((word, index) => (
                      <React.Fragment key={`same-sin-${index}`}>
                        <button className="py-1">
                          {word}
                        </button>
                        <hr />
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="w-4 h-5 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-200"></div>
                </div>
              </div>
            )}
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter text"
              value={fromText}
              onChange={(e) => {
                setFromText(e.target.value);
                checkAmbiguity(e.target.value, fromLang);
              }}
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