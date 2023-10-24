import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
