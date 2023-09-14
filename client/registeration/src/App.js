import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import NextPage from './NextPage';


const App = () => {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/next-page" element={<NextPage />} />
      </Routes>
    </Router>
  );
};

export default App;
