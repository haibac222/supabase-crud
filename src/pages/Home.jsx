import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className="mb-4">Xin chào đến với trang quản lý</h1>
      <Link to="/classes" className="btn btn-primary me-2">Quản lý Lớp học</Link>
      <Link to="/students" className="btn btn-secondary">Quản lý Sinh viên</Link>
    </div>
  );
}

export default Home;
