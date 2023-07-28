const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

let tasks = [];

function createTask() {
  const titleInput = document.getElementById('title-input');
  const descriptionInput = document.getElementById('description-input');
  const dueDateInput = document.getElementById('due-date-input');
  const prioritySelect = document.getElementById('priority-select');

  const task = {
    title: titleInput.value,
    description: descriptionInput.value,
    dueDate: dueDateInput.value,
    priority: prioritySelect.value
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task', task.priority + '-priority');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;
    taskElement.appendChild(taskTitle);

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;
    taskElement.appendChild(taskDescription);

    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = 'Due Date: ' + task.dueDate;
    taskElement.appendChild(taskDueDate);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
  });
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  createTask();
});
