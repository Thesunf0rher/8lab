import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'; // Убедитесь, что путь правильный
import TodoForm from './components/TodoForm'; // Убедитесь, что путь правильный
import './App.css'; // Стиль для темной темы

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkTheme, setDarkTheme] = useState(false);

  // Загружаем задачи из локального хранилища при первом рендере
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      console.log('Загруженные задачи:', parsedTodos);
      setTodos(parsedTodos);
    }
  }, []);
   // Пустой массив зависимостей гарантирует, что это сработает только при первом рендере

  // Сохраняем задачи в локальное хранилище при каждом изменении
  useEffect(() => {
    if (todos.length > 0) {
      console.log('Сохраняем задачи в localStorage:', todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);
   // Этот useEffect сработает каждый раз, когда `todos` изменяется

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      isComplete: false,
    };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.isComplete;
    if (filter === 'incomplete') return !todo.isComplete;
    return true; // Если фильтр "Все"
  });

  const completedCount = todos.filter(todo => todo.isComplete).length;
  const incompleteCount = todos.filter(todo => !todo.isComplete).length;

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={darkTheme ? 'dark-theme' : ''}>
      <h1>Список дел</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('completed')}>Завершенные</button>
        <button onClick={() => setFilter('incomplete')}>Незавершенные</button>
      </div>
      <TodoList todos={filteredTodos} editTodo={editTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
      <div>
        <p>Завершенные задачи: {completedCount}</p>
        <p>Незавершенные задачи: {incompleteCount}</p>
      </div>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}

export default App;
