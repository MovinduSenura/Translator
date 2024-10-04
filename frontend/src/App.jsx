import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TranslationPage from "./components/TranslationPage";
import SavedTranslations from "./components/SavedTranslations";
import TranslationHistory from "./components/TranslationHistory";
import UpdateTranslationPage from "./components/UpdateTranslationPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TranslationPage />} />
          <Route path='/savedTranslations' element={<SavedTranslations />} />
          <Route path='/translationHistory' element={<TranslationHistory />} />
          <Route path='/updateTranslationPage/:id' element={<UpdateTranslationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
