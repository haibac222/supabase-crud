
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Students from './pages/Students';

function App() {
  return (
    <Router > {/* Đổi nếu deploy ở thư mục gốc thì bỏ dòng này */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Quản lý</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/classes">Lớp học</Link>
          <Link className="nav-link" to="/students">Sinh viên</Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
