import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TranslationPage from "./components/TranslationPage";
import SavedTranslations from "./components/SavedTranslations";
import UpdateTranslationPage from "./components/UpdateTranslationPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TranslationPage />} />
          <Route path='/savedTranslations' element={<SavedTranslations />} />
          <Route path='/updateTranslationPage/:id' element={<UpdateTranslationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
