import React, { useState, useEffect, useRef } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, isEditing, onUpdate }) {
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text)
      inputRef.current?.focus()
    }
  }, [isEditing, todo.text])

  const save = () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    onUpdate(todo.id, trimmed)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="left">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      </label>

      {!isEditing ? (
        <div className="content" onDoubleClick={onEdit}>
          <span>{todo.text}</span>
        </div>
      ) : (
        <div className="edit">
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') setEditText(todo.text)
            }}
          />
          <button onClick={save}>Save</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}

      {!isEditing && (
        <div className="actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </li>
  )
}
