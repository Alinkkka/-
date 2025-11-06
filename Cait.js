import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const quickTasks = [
    'Помыть посуду',
    'Пропылесосить',
    'Постирать бельё',
    'Полить цветы',
    'Вынести мусор',
    'Приготовить ужин'
  ];

  // Загрузка задач из localStorage при монтировании
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('homeTasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Сохранение задач в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('homeTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const taskText = text || newTask;
    if (taskText.trim() === '') return;

    setTasks([...tasks, {
      text: taskText.trim(),
      completed: false
    }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Домашний To-Do Лист</h1>
        
        <div style={styles.taskInputSection}>
          <div style={styles.taskInput}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавьте новую задачу..."
              style={styles.input}
            />
            <button 
              onClick={() => addTask()}
              style={styles.addButton}
            >
              Добавить
            </button>
          </div>
          
          <div style={styles.quickTasks}>
            <h3>Быстрые задачи:</h3>
            <div style={styles.quickTaskButtons}>
              {quickTasks.map((task, index) => (
                <button
                  key={index}
                  onClick={() => addTask(task)}
                  style={styles.quickTaskBtn}
                >
                  {task}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <ul style={styles.taskList}>
          {tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/%3E%3C/svg%3E" 
                alt="Нет задач"
              />
              <p>У вас пока нет задач. Добавьте новую!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <li 
                key={index}
                style={{
                  ...styles.taskItem,
                  ...(task.completed ? styles.completedTask : {})
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  style={styles.taskCheckbox}
                />
                <span style={styles.taskText}>{task.text}</span>
                <button
                  onClick={() => deleteTask(index)}
                  style={styles.deleteBtn}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
        
        <div style={styles.stats}>
          <span>Всего задач: <span style={styles.counter}>{totalTasks}</span></span>
          <span>Выполнено: <span style={styles.counter}>{completedTasks}</span></span>
        </div>
      </div>
    </div>
  );
};

// Стили остаются практически такими же, но преобразованы в объекты JavaScript
const styles = {
  body: {
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '500px',
    padding: '30px'
  },
  taskInputSection: {
    marginBottom: '25px'
  },
  taskInput: {
    display: 'flex',
    marginBottom: '15px'
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    border: '2px solid #e0e0e0',
    borderRight: 'none',
    borderRadius: '8px 0 0 8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  addButton: {
    backgroundColor: '#2575fc',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '0 8px 8px 0',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s'
  },
  quickTasks: {
    marginTop: '20px'
  },
  quickTaskButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  quickTaskBtn: {
    backgroundColor: '#f0f4ff',
    border: '1px solid #d0d8ff',
    borderRadius: '20px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  taskList: {
    listStyleType: 'none',
    marginTop: '20px',
    padding: 0
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'all 0.3s',
    animation: 'fadeIn 0.5s'
  },
  completedTask: {
    backgroundColor: '#e8ffe8',
    textDecoration: 'line-through',
    color: '#888'
  },
  taskCheckbox: {
    marginRight: '12px',
    transform: 'scale(1.2)',
    cursor: 'pointer'
  },
  taskText: {
    flex: 1,
    fontSize: '16px'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#ff5252',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '5px',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: '14px'
  },
  counter: {
    fontWeight: 'bold'
  },
  emptyState: {
    textAlign: 'center',
    padding: '30px',
    color: '#888'
  }
};

// Добавляем CSS анимации через тег style
const GlobalStyles = () => (
  <style>
    {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .task-input input:focus {
        border-color: #2575fc;
      }
      
      .task-input button:hover {
        background-color: #1a68e8;
      }
      
      .quick-task-btn:hover {
        background-color: #e1e8ff;
        transform: translateY(-2px);
      }
      
      .task-item:hover {
        background-color: #f0f4ff;
        transform: translateX(5px);
      }
      
      .delete-btn:hover {
        background-color: #ffeaea;
      }
    `}
  </style>
);

const App = () => (
  <>
    <GlobalStyles />
    <TodoApp />
  </>
);

export default App;