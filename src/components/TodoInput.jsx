import React, { useState, useRef, useEffect } from 'react'


export default function TodoInput({ onAdd }) {
const [text, setText] = useState('')
const inputRef = useRef(null)


useEffect(() => {
inputRef.current?.focus()
}, [])


const submit = (e) => {
e.preventDefault()
if (!text.trim()) return
onAdd(text)
setText('')
}


return (
<form className="todo-input" onSubmit={submit}>
<input
ref={inputRef}
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="What needs to be done?"
aria-label="New todo"
/>
<button type="submit">Add</button>
</form>
)
}