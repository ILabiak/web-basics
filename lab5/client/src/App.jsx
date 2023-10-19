import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './components/Main';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
