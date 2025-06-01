import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    let { data } = await supabase.from('todos').select('*').order('id', { ascending: true });
    setTodos(data);
  }

  async function addTodo() {
    if (!newTitle) return;
    await supabase.from('todos').insert([{ title: newTitle }]);
    setNewTitle('');
    fetchTodos();
  }

  async function deleteTodo(id) {
    await supabase.from('todos').delete().eq('id', id);
    fetchTodos();
  }

  async function startEdit(todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  async function saveEdit(id) {
    await supabase.from('todos').update({ title: editingTitle }).eq('id', id);
    setEditingId(null);
    setEditingTitle('');
    fetchTodos();
  }

  return (
    <div>
      <h1>Todo List (Supabase)</h1>
      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="Thêm công việc mới"
      />
      <button onClick={addTodo}>Thêm</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Lưu</button>
              </>
            ) : (
              <>
                {todo.title}
                <button onClick={() => startEdit(todo)}>Sửa</button>
                <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;