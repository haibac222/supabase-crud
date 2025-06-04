import React, { useEffect, useState } from 'react';
import supabase from '../supabase';  // Import supabase từ supabase.js

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [editClassId, setEditClassId] = useState(null);
  const [editClassName, setEditClassName] = useState('');

  // Fetch classes từ Supabase
  useEffect(() => {
      fetchClasses()
    }, [])

    // Lấy danh sách lớp học==========================================================================================
    async function fetchClasses() {
      const { data, error } = await supabase.from('classes').select('*')
      if (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      } else {
        setClasses(data)
      }
    }

  // Thêm lớp mới
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClassName) return; // Nếu tên lớp trống thì không thêm

    const newClassData = {
      name: newClassName, // Chỉ cần gửi tên lớp
    };

    const { data, error } = await supabase
      .from("classes")
      .insert([newClassData])
      .select('*'); // Lấy lại toàn bộ dữ liệu của lớp mới thêm

    // Kiểm tra lỗi chi tiết từ Supabase
    if (error) {
      console.error('Lỗi khi thêm lớp:', error); // Log lỗi chi tiết
    } else {
      //console.log("Data fetched:", data); // Kiểm tra xem dữ liệu trả về
      if (data) {
        setClasses((prev) => [...prev, ...data]); // Cập nhật state classes với lớp mới
      }
    }

    setNewClassName(''); // Xóa input sau khi thêm lớp
  };


  // Chỉnh sửa lớp
  const handleEditClass = async (e) => {
    e.preventDefault();
    if (!editClassName) return;

    const { data, error } = await supabase
      .from('classes')
      .update({ name: editClassName })
      .eq('id', editClassId);

    if (error) {
      console.error('Lỗi khi chỉnh sửa lớp:', error);
    } else {
      // Cập nhật danh sách lớp sau khi chỉnh sửa thành công
      setClasses(classes.map(cls => (cls.id === editClassId ? { ...cls, name: editClassName } : cls)));
      setEditClassId(null); // Đóng form chỉnh sửa
      setEditClassName(''); // Xóa input sau khi lưu
      //fetchClasses()
    }
  };

  // Xóa lớp
  const handleDeleteClass = async (id) => {
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (error) {
      console.error('Lỗi khi xóa lớp:', error);
    } else {
      // Xóa lớp khỏi danh sách state
      setClasses(classes.filter(cls => cls.id !== id));
      
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Danh sách lớp học</h2>

      {/* Form thêm lớp */}
      <form onSubmit={handleAddClass} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tên lớp mới"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Thêm lớp</button>
        </div>
      </form>

      {/* Hiển thị danh sách lớp học */}
      {classes.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => {
            if (!cls || !cls.id) return null; // Kiểm tra nếu phần tử cls không hợp lệ
            return (
              <tr key={cls.id}>
                <td>{cls.id}</td>
                <td>
                  {editClassId === cls.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editClassName}
                      onChange={(e) => setEditClassName(e.target.value)}
                    />
                  ) : (
                    cls.name
                  )}
                </td>
                <td>
                  {editClassId === cls.id ? (
                    <button onClick={handleEditClass} className="btn btn-success btn-sm">Lưu</button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditClassId(cls.id);
                        setEditClassName(cls.name);
                      }}
                      className="btn btn-warning btn-sm"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <div className="alert alert-warning" role="alert">
        Không có lớp học nào!
      </div>
    )}
    </div>
  );
};

export default ClassesList;
