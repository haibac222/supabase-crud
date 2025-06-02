import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', birth_year: '', gender: 'Khác', class_id: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase.from('students').select('*').order('id', { ascending: true });
    if (error) {
      console.error('Lỗi khi lấy sinh viên:', error);
    } else {
      setStudents(data);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.birth_year) return alert('Vui lòng nhập tên và năm sinh');

    if (editingId) {
      // UPDATE
      const { error } = await supabase.from('students').update(form).eq('id', editingId);
      if (error) return alert('Lỗi cập nhật');
    } else {
      // INSERT
      const { error } = await supabase.from('students').insert([form]);
      if (error) return alert('Lỗi thêm mới');
    }

    setForm({ name: '', birth_year: '', gender: 'Khác', class_id: '' });
    setEditingId(null);
    fetchStudents();
  }

  function handleEdit(student) {
    setForm(student);
    setEditingId(student.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Bạn chắc chắn muốn xóa?')) return;
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) return alert('Lỗi xóa');
    fetchStudents();
  }

  return (
    <div>
      <h2 className="mb-4">Danh sách sinh viên</h2>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <h5>{editingId ? 'Sửa sinh viên' : 'Thêm sinh viên mới'}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Họ tên" required />
          </div>
          <div className="col-md-2">
            <input name="birth_year" value={form.birth_year} onChange={handleChange} type="number" className="form-control" placeholder="Năm sinh" required />
          </div>
          <div className="col-md-2">
            <select name="gender" value={form.gender} onChange={handleChange} className="form-select">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="col-md-2">
            <input name="class_id" value={form.class_id || ''} onChange={handleChange} type="number" className="form-control" placeholder="Lớp ID" />
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary">{editingId ? 'Lưu' : 'Thêm'}</button>
            {editingId && <button type="button" onClick={() => { setForm({ name: '', birth_year: '', gender: 'Khác', class_id: '' }); setEditingId(null); }} className="btn btn-secondary">Hủy</button>}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Năm sinh</th>
            <th>Giới tính</th>
            <th>Lớp ID</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.birth_year}</td>
              <td>{s.gender}</td>
              <td>{s.class_id ?? '—'}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
