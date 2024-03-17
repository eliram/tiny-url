import React from 'react';
import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TinyUrlHome from './Pages/home';
import Layout from './Layout';
import UrlsList from './Pages/UrlsList';

function App() {
  return (
  <div className="App">
    <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<TinyUrlHome/>}/>
            <Route path="/urls" element={<UrlsList/>}/>
          </Route>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
