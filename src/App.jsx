import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Import react-router-dom

import StudentsList from './pages/StudentsList';  // Import component StudentsList
import ClassesList from './pages/ClassesList';    // Import component ClassesList
import supabase from './supabase';  // Import supabase từ supabase.js

const App = () => {
  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center">Ứng dụng Quản lý Sinh Viên</h1>

        {/* Navigation links */}
        <nav>
          <ul className="nav justify-content-center my-4">
            <li className="nav-item">
              <Link className="nav-link" to="/students">Danh sách Sinh Viên</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/classes">Danh sách Lớp Học</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/students" element={<StudentsList />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route path="/" element={<Home />} /> {/* Màn hình chính */}
        </Routes>
      </div>
    </Router>
  );
};

// Trang Home - Màn hình chính
const Home = () => {
  return (
    <div>
      <h2 className="text-center">Chào mừng đến với hệ thống quản lý sinh viên!</h2>
      <p className="text-center">Sử dụng các liên kết trên để xem thông tin sinh viên và lớp học.</p>
    </div>
  );
};

export default App;
