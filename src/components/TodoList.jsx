import React from 'react'
import TodoItem from './TodoItem'


export default function TodoList({ todos, onToggle, onDelete, onEdit, editingId, onUpdate }) {
if (!todos.length) return <p className="empty">No todos yet — add your first one!</p>


return (
<ul className="todo-list">
{todos.map(todo => (
<TodoItem
key={todo.id}
todo={todo}
onToggle={() => onToggle(todo.id)}
onDelete={() => onDelete(todo.id)}
onEdit={() => onEdit(todo.id)}
isEditing={editingId === todo.id}
onUpdate={onUpdate}
/>
))}
</ul>
)
}