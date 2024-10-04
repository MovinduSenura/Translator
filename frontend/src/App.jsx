import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateAdmin from './components/createAdmin'
import ViewAllAdmins from './components/viewAllAdmins'
import UpdateAdmin from "./components/updateAdmin";
import AdminDashboard from "./components/adminDashboard"
import CreateWord from "./components/createWords";
import ViewWordslist from "./components/viewWordslit";
import UpdateWord from "./components/updateWord";


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

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
