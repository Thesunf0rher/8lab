import React, { useState } from 'react';

function TodoItem({ todo, editTodo, deleteTodo, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`todo-item ${todo.isComplete ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => toggleComplete(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={handleEdit}>
        {isEditing ? 'Сохранить' : 'Редактировать'}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem;
