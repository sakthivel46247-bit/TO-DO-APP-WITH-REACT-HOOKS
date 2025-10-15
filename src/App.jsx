import React, { useState, useEffect, useMemo } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import useLocalStorage from './hooks/useLocalStorage'

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id, newText) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t))
    setEditingId(null)
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed))
  }

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }, [todos, filter])

  return (
    <div className="app-shell">
      <header>
        <h1>To‑Do App (React Hooks)</h1>
      </header>

      <main>
        <TodoInput onAdd={addTodo} />

        <section className="controls">
          <div className="filters">
            <button onClick={() => setFilter('all')} className={filter==='all'? 'active':''}>All</button>
            <button onClick={() => setFilter('active')} className={filter==='active'? 'active':''}>Active</button>
            <button onClick={() => setFilter('completed')} className={filter==='completed'? 'active':''}>Completed</button>
          </div>
          <div className="counts">
            <span>{activeCount} active</span>
            <span>{completedCount} completed</span>
            <button onClick={clearCompleted} disabled={completedCount===0}>Clear completed</button>
          </div>
        </section>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={(id) => setEditingId(id)}
          editingId={editingId}
          onUpdate={updateTodo}
        />
      </main>

      <footer>
        <small>Built with React Hooks • LocalStorage persistence</small>
      </footer>
    </div>
  )
}
