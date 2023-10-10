import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupScreen from './Components/SignupScreen/SignupScreen';
import LoginScreen from './Components/LoginScreen/LoginScreen';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignupScreen />} />

        <Route exact path='/login' element={<LoginScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
