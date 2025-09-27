const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task !== '') {
    addTask(task);
    saveTask(task);
    taskInput.value = '';
  }
});

// Add task to UI
function addTask(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTasks();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Update all tasks in localStorage
function updateTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTask(task.text, task.completed));
}
