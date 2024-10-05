import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateAdmin from "./components/createAdmin";
import ViewAllAdmins from "./components/viewAllAdmins";
import UpdateAdmin from "./components/updateAdmin";
import AdminDashboard from "./components/adminDashboard";
import CreateWord from "./components/createWords";
import ViewWordslist from "./components/viewWordslit";
import UpdateWord from "./components/updateWord";

// import TranslationPage from "./components/TranslationPage";
import SavedTranslations from "./components/SavedTranslations";
import TranslationHistory from "./components/TranslationHistory";
import UpdateTranslationPage from "./components/UpdateTranslationPage";
import TranslatorPg from "./components/TranslatorPg";
import FeedbackList from "./components/FeedbackList";
import CreateFeedback from "./components/CreateFeedbacks";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UpdateFeedback from "./components/UpdateFeedback";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/viewAllAdmins" element={<ViewAllAdmins />} />
          <Route path="/updateAdmin/:id" element={<UpdateAdmin />} />

          <Route path="/createWord" element={<CreateWord />} />
          <Route path="/viewWordslist" element={<ViewWordslist />} />
          <Route path="/updateWord/:id" element={<UpdateWord />} />

          <Route path="/" element={<TranslatorPg />} />
          {/* <Route path='/translationPage' element={<TranslationPage />} /> */}
          <Route path="/savedTranslations" element={<SavedTranslations />} />
          <Route path="/translationHistory" element={<TranslationHistory />} />
          <Route
            path="/updateTranslationPage/:id"
            element={<UpdateTranslationPage />}
          />
          {/* <Route path='/translatorPg' element={<TranslatorPg />} /> */}

          {/* Feedback section */}
          <Route path="/feedbacklist" element={<FeedbackList />} />
          <Route path="/createfeedback" element={<CreateFeedback />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/feedbacks" element={<UserFeedbackList />} /> */}
          <Route path="/update-feedback/:id" element={<UpdateFeedback />} />

          {/* <Route path='/' element={<TranslationPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
