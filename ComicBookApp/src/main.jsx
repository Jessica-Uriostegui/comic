import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import App from './App';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetail from './components/CharacterDetail';
import Comics from './components/Comics';
import NotFound from './components/NotFound';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<BrowseCharacters />} />
            <Route path="characters/:id" element={<CharacterDetail />} />
            <Route path="comics" element={<Comics />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);


  
    

