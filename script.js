// Ежедневник — функциональность

const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const tasksList = document.getElementById('tasks-list');

let taskCounter = 0;

document.addEventListener('DOMContentLoaded', () => updateEmptyState());

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskName) {
    alert('Введите название задачи!');
    taskNameInput.focus();
    return;
  }

  const task = {
    id: ++taskCounter,
    name: taskName,
    description: taskDescription
  };

  addTaskToList(task);
  taskForm.reset();
  taskNameInput.focus();
  updateEmptyState();
});

function addTaskToList(task) {
  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.setAttribute('data-task-id', task.id);

  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';

  const taskName = document.createElement('div');
  taskName.className = 'task-name';
  taskName.textContent = task.name;

  const taskDescription = document.createElement('div');
  taskDescription.className = 'task-description';
  taskDescription.textContent = task.description || 'Без описания';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Удалить';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  taskContent.appendChild(taskName);
  taskContent.appendChild(taskDescription);
  taskCard.appendChild(taskContent);
  taskCard.appendChild(deleteBtn);
  tasksList.appendChild(taskCard);
}

function deleteTask(taskId) {
  const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
  if (taskCard) {
    taskCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    taskCard.style.opacity = '0';
    taskCard.style.transform = 'translateX(100%)';
    setTimeout(() => {
      taskCard.remove();
      updateEmptyState();
    }, 300);
  }
}

function updateEmptyState() {
  const empty = tasksList.querySelector('.empty-state');
  if (tasksList.children.length === 0) {
    if (!empty) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'empty-state';
      emptyDiv.textContent = 'Нет задач. Добавь первую задачу выше!';
      tasksList.appendChild(emptyDiv);
    }
  } else if (empty) {
    empty.remove();
  }
}
