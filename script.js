const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const STORAGE_KEY = 'simpleTasks';

let tasks = loadTasks();
renderTasks();

function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button data-index="${index}">Delete</button>
        `;
        taskList.appendChild(listItem);
    });

    
    document.querySelectorAll('#task-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', toggleComplete);
    });
    document.querySelectorAll('#task-list button').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

function toggleComplete(event) {
    const index = parseInt(event.target.dataset.index);
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(event) {
    const index = parseInt(event.target.dataset.index);
    tasks.splice(index, 1); 
    saveTasks();
    renderTasks();
}