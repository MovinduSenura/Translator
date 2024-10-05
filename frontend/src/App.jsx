import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import CreateAdmin from './components/createAdmin'
import ViewAllAdmins from './components/viewAllAdmins'
import UpdateAdmin from "./components/updateAdmin";
import AdminDashboard from "./components/adminDashboard"
import CreateWord from "./components/createWords";
import ViewWordslist from "./components/viewWordslit";
import UpdateWord from "./components/updateWord";


// import TranslationPage from "./components/TranslationPage";
import SavedTranslations from "./components/SavedTranslations";
import TranslationHistory from "./components/TranslationHistory";
import UpdateTranslationPage from "./components/UpdateTranslationPage";
import TranslatorPg from "./components/TranslatorPg";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<AdminDashboard />} />
        <Route path='/createAdmin' element={<CreateAdmin />} />
         <Route path='/viewAllAdmins' element={<ViewAllAdmins />} /> 
         <Route path='/updateAdmin/:id' element={<UpdateAdmin />} /> 

         <Route path='/createWord' element={<CreateWord />} />
         <Route path='/viewWordslist' element={<ViewWordslist />} /> 
         <Route path='/updateWord/:id' element={<UpdateWord />} /> 


          <Route path='/' element={<TranslatorPg />} />
          {/* <Route path='/translationPage' element={<TranslationPage />} /> */}
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
