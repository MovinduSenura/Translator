import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TranslationPage from "./components/TranslationPage";
import SavedTranslations from "./components/SavedTranslations";
import TranslationHistory from "./components/TranslationHistory";
import UpdateTranslationPage from "./components/UpdateTranslationPage";
import TranslatorPg from "./components/TranslatorPg";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TranslatorPg />} />
          <Route path='/translationPage' element={<TranslationPage />} />
          <Route path='/savedTranslations' element={<SavedTranslations />} />
          <Route path='/translationHistory' element={<TranslationHistory />} />
          <Route path='/updateTranslationPage/:id' element={<UpdateTranslationPage />} />
          {/* <Route path='/translatorPg' element={<TranslatorPg />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
