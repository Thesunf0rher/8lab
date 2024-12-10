import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, editTodo, deleteTodo, toggleComplete }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;

