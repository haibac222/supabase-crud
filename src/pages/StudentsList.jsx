import React, { useEffect, useState } from 'react';
import supabase from '../supabase';  // Import supabase từ supabase.js

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentBirthYear, setNewStudentBirthYear] = useState('');
  const [newStudentGender, setNewStudentGender] = useState('Khác');
  const [newStudentClassId, setNewStudentClassId] = useState('');  // Lớp sinh viên sẽ chọn
  const [editStudentId, setEditStudentId] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentBirthYear, setEditStudentBirthYear] = useState('');
  const [editStudentGender, setEditStudentGender] = useState('Khác');
  const [editStudentClassId, setEditStudentClassId] = useState('');

  // Fetch students và classes từ Supabase
  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  // Lấy danh sách sinh viên
  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (error) {
      console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
    } else {
      setStudents(data);
    }
  };

  // Lấy danh sách lớp học
  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('*');
    if (error) {
      console.error('Lỗi khi lấy dữ liệu lớp học:', error);
    } else {
      setClasses(data);
    }
  };

  // Thêm sinh viên mới
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName || !newStudentBirthYear || !newStudentClassId) return; // Kiểm tra các trường dữ liệu


    const newStudentData = {
      name: newStudentName,
      birth_year: newStudentBirthYear,
      gender: newStudentGender,
      class_id: newStudentClassId, 
    };
    
    const { data, error } = await supabase
      .from("students")
      .insert([newStudentData])
      .select('*'); // Lấy lại toàn bộ dữ liệu của lớp mới thêm

    if (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    } else {
      //console.log("Data fetched:", data);
      
      setStudents((prev) => [...prev, ...data]); // Cập nhật state classes với lớp mới
    
    }
      setNewStudentName('');
      setNewStudentBirthYear('');
      setNewStudentGender('Khác');
      setNewStudentClassId('');
      //fetchStudents();
  };

  // Chỉnh sửa sinh viên
  const handleEditStudent = async (e) => {
    e.preventDefault();
    if (!editStudentName || !editStudentBirthYear || !editStudentClassId) return;


    const editStudentData = {
    name: editStudentName, // Dùng đúng tên biến state
    birth_year: editStudentBirthYear,
    gender: editStudentGender,
    class_id: editStudentClassId,
  };

    const { data, error } = await supabase
      .from('students')
      .update([editStudentData])
      .eq('id', editStudentId)
      .select('*');
    if (error) {
      console.error('Lỗi khi chỉnh sửa sinh viên:', error);
    } else {
     
      //setStudents(students.map(student => (student.id === editStudentId ? data[0] : student)));
      setStudents(students.map(student => 
        student.id === editStudentId ? data[0] : student // Sử dụng data[0] vì Supabase trả về mảng
      ));
      //fetchStudents();
   
      
    }
    
    setEditStudentId(null);
    setEditStudentName('');
    setEditStudentBirthYear('');
    setEditStudentGender('Khác');
    setEditStudentClassId('');
  };

  // Xóa sinh viên
  const handleDeleteStudent = async (id) => {
    const { data, error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);
    if (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
    } else {
      console.log("Data fetched:", data);
     
      setStudents((prev) => prev.filter((student) => student.id !== id));
      
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Danh sách sinh viên</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} className="mb-4">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tên sinh viên"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
        </div>
        <div className="input-group mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Năm sinh"
            value={newStudentBirthYear}
            onChange={(e) => setNewStudentBirthYear(e.target.value)}
          />
        </div>
        <div className="input-group mb-2">
          <select
            className="form-select"
            value={newStudentGender}
            onChange={(e) => setNewStudentGender(e.target.value)}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div className="input-group mb-2">
          <select
            className="form-select"
            value={newStudentClassId}
            onChange={(e) => setNewStudentClassId(e.target.value)}
          >
            <option value="">Chọn lớp</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Thêm sinh viên</button>
      </form>

      {/* Hiển thị danh sách sinh viên */}
      {students.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sinh viên</th>
              <th>Năm sinh</th>
              <th>Giới tính</th>
              <th>Lớp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  {editStudentId === student.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editStudentName}
                      onChange={(e) => setEditStudentName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <input
                      type="number"
                      className="form-control"
                      value={editStudentBirthYear}
                      onChange={(e) => setEditStudentBirthYear(e.target.value)}
                    />
                  ) : (
                    student.birth_year
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <select
                      className="form-select"
                      value={editStudentGender}
                      onChange={(e) => setEditStudentGender(e.target.value)}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    student.gender
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <select
                      className="form-select"
                      value={editStudentClassId}
                      onChange={(e) => setEditStudentClassId(e.target.value)}
                    >
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  ) : (
                    student.class_id
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <button onClick={handleEditStudent} className="btn btn-success btn-sm">Lưu</button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditStudentId(student.id);
                        setEditStudentName(student.name);
                        setEditStudentBirthYear(student.birth_year);
                        setEditStudentGender(student.gender);
                        setEditStudentClassId(student.class_id);
                      }}
                      className="btn btn-warning btn-sm"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          Không có sinh viên nào!
        </div>
      )}
    </div>
  );
};

export default StudentsList;
