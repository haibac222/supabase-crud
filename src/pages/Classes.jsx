import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    const { data, error } = await supabase.from('classes').select('*').order('id', { ascending: true });
    if (error) {
      console.error('Lỗi khi lấy lớp:', error);
    } else {
      setClasses(data);
    }
  }

  function handleChange(e) {
    setForm({ ...form, name: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) return alert('Vui lòng nhập tên lớp');

    if (editingId) {
      const { error } = await supabase.from('classes').update(form).eq('id', editingId);
      if (error) return alert('Lỗi cập nhật lớp');
    } else {
      const { error } = await supabase.from('classes').insert([form]);
      if (error) return alert('Lỗi thêm lớp mới');
    }

    setForm({ name: '' });
    setEditingId(null);
    fetchClasses();
  }

  function handleEdit(cls) {
    setForm({ name: cls.name });
    setEditingId(cls.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Bạn chắc chắn muốn xóa lớp này?')) return;
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (error) return alert('Lỗi khi xóa');
    fetchClasses();
  }

  return (
    <div>
      <h2 className="mb-4">Danh sách lớp học</h2>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <h5>{editingId ? 'Sửa lớp học' : 'Thêm lớp mới'}</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Tên lớp"
              required
            />
          </div>
          <div className="col-md-6 d-flex gap-2">
            <button type="submit" className="btn btn-primary">{editingId ? 'Lưu' : 'Thêm'}</button>
            {editingId && <button type="button" onClick={() => { setForm({ name: '' }); setEditingId(null); }} className="btn btn-secondary">Hủy</button>}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cls)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cls.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Classes;
