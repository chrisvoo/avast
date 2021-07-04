import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebars/LeftSidebar';
import Footer from './footer/Footer';
import RightSidebar from './sidebars/RightSidebar';
import Main from './content/Main';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <Main />

      <RightSidebar />
      <Footer />
    </Router>
  );
}

export default App;
