import React, { useState, createContext } from 'react'
import './App.css';
import { About, Admin, Blogs, Contact, Home, Trainings,Dashboard, Training, Post } from './Pages'
import { Navbar, Footer } from './Components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import CRUD_TR from './Pages/CRUD_TR/CRUD_TR';
function App() {
  const ThemeContext = createContext(null);
  const [isAuth, setAuth] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ThemeContext.Provider value={isAuth}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/admin' element={<Admin setAuth={setAuth} />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogID" exact element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path='/training/:trainingID' exact element={<Training />} />
            <Route path='/dashboard' element={<ProtectedRoute setAuth={setAuth} isAuth={isAuth} Component={Dashboard} />} />
          </Routes>
        </ThemeContext.Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
