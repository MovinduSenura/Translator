import React from "react";
// import TranslationPage from "./components/TranslationPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<TranslationPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
