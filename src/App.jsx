import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://easeretmxqwohwufyuga.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc2VyZXRteHF3d2h3dWZ5dWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTQwNTQsImV4cCI6MjA2NDM3MDA1NH0.wwPOESaiuhSD6aLGy4SeUEuCtyW8zIwmEHBEF22wHPQ')

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    const { data } = await supabase.from('students').select('*')
    setStudents(data || [])
  }

  async function addStudent() {
    if (!name) return
    await supabase.from('students').insert({ name })
    setName('')
    fetchStudents()
  }

  async function deleteStudent(id) {
    await supabase.from('students').delete().eq('id', id)
    fetchStudents()
  }

  function startEdit(student) {
    setEditId(student.id)
    setEditName(student.name)
  }

  async function saveEdit(id) {
    if (!editName) return
    await supabase.from('students').update({ name: editName }).eq('id', id)
    setEditId(null)
    setEditName('')
    fetchStudents()
  }

  function cancelEdit() {
    setEditId(null)
    setEditName('')
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên sinh viên"
          className="border p-2 flex-1"
        />
        <button onClick={addStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm
        </button>
      </div>
      <ul>
        {students.map((s) => (
          <li key={s.id} className="flex justify-between items-center py-1 border-b">
            {editId === s.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 flex-1 mr-2"
                />
                <button onClick={() => saveEdit(s.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-1">Lưu</button>
                <button onClick={cancelEdit} className="text-gray-500">Hủy</button>
              </>
            ) : (
              <>
                {s.name}
                <div>
                  <button onClick={() => startEdit(s)} className="text-blue-500 mr-2">Sửa</button>
                  <button onClick={() => deleteStudent(s.id)} className="text-red-500">Xóa</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App