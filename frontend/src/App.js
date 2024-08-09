import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetQuestions from './View/GetQues';
import LoginForm from './View/Login';
import AdminHome from './View/Admin_home';
import Create_user from './View/Create_user';
import Manage_questions from './View/Manage_question';
import Create_question from './View/Create_question';
import Register from './View/Register';
import Start from './View/Start_test';
import Result from './View/Results';
import { UserProvider } from './View/UserContext';
function App() {

  return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm  />} />
            <Route path="/GetQuestions" element={<GetQuestions   />} />
            <Route path="/admin_home" element={<AdminHome  />} />
            <Route path="/create_user" element={<Create_user />} />
            <Route path="/manage_questions" element={<Manage_questions />}/>
            <Route path="/Create_question" element={<Create_question />}/>
            <Route path="/Registe" element={<Register />}/>
            <Route path="/Start" element={<Start />}/>
            <Route path="/Result" element={<Result   />}/>

          </Routes>
        </Router>
      </UserProvider>
  );
}

export default App;

