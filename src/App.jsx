import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient' // Đảm bảo đã cấu hình Supabase

function App() {
  const [classes, setClasses] = useState([])
  const [className, setClassName] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  // Lấy danh sách lớp học
  async function fetchClasses() {
    const { data, error } = await supabase.from('classes').select('*')
    if (error) {
      console.error('Lỗi khi lấy dữ liệu:', error)
    } else {
      setClasses(data)
    }
  }

  // Thêm lớp học mới
  async function addClass() {
    if (!className.trim()) return
    const { error } = await supabase.from('classes').insert({ name: className })
    if (error) {
      console.error('Lỗi khi thêm:', error)
    }
    setClassName('')
    fetchClasses()
  }

  // Cập nhật lớp học
  async function updateClass() {
    if (!className.trim() || !editingId) return
    const { error } = await supabase
      .from('classes')
      .update({ name: className })
      .eq('id', editingId)
    if (error) {
      console.error('Lỗi khi cập nhật:', error)
    }
    setClassName('')
    setEditingId(null)
    fetchClasses()
  }

  // Xóa lớp học
  async function deleteClass(id) {
    const { error } = await supabase.from('classes').delete().eq('id', id)
    if (error) {
      console.error('Lỗi khi xóa:', error)
    }
    fetchClasses()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý lớp học</h1>

      <div className="mb-2">
        {editingId && (
          <div className="text-sm text-gray-600 mb-1">
            Đang chỉnh sửa lớp với ID: <span className="font-mono">{editingId}</span>
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Nhập tên lớp"
            className="border p-2 flex-1"
          />
          {editingId ? (
            <button
              onClick={updateClass}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Cập nhật
            </button>
          ) : (
            <button
              onClick={addClass}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Thêm
            </button>
          )}
        </div>
      </div>

      <ul className="mt-4">
        {classes.map((cls) => (
          <li
            key={cls.id}
            className="flex justify-between items-start py-2 border-b"
          >
            <div>
              <div className="font-medium">{cls.name}</div>
              <div className="text-sm text-gray-500">ID: {cls.id}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setClassName(cls.name)
                  setEditingId(cls.id)
                }}
                className="text-yellow-500"
              >
                Sửa
              </button>
              <button
                onClick={() => deleteClass(cls.id)}
                className="text-red-500"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
