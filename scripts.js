document.addEventListener('DOMContentLoaded', function() {
    const newTaskButton = document.getElementById('newTaskButton');
    const taskList = document.getElementById('taskList');

    // Fetch tasks from the API
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = ''; // Clear existing tasks
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="deleteTaskButton" data-id="${task.id}">Delete</button>
                `;
                taskList.appendChild(taskElement);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    // Add new task
    newTaskButton.addEventListener('click', function() {
        const taskTitle = prompt('Enter task title:');
        const taskDescription = prompt('Enter task description:');

        if (taskTitle && taskDescription) {
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: taskTitle, description: taskDescription })
            })
            .then(response => response.json())
            .then(newTask => {
                // Refresh task list
                fetch('/tasks')
                    .then(response => response.json())
                    .then(tasks => {
                        taskList.innerHTML = '';
                        tasks.forEach(task => {
                            const taskElement = document.createElement('div');
                            taskElement.innerHTML = `
                                <h3>${task.title}</h3>
                                <p>${task.description}</p>
                                <button class="deleteTaskButton" data-id="${task.id}">Delete</button>
                            `;
                            taskList.appendChild(taskElement);
                        });
                    });
            })
            .catch(error => console.error('Error creating task:', error));
        }
    });

    // Delete task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteTaskButton')) {
            const taskId = event.target.dataset.id;
            if (confirm('Are you sure you want to delete this task?')) {
                fetch(`/tasks/${taskId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        // Refresh task list
                        fetch('/tasks')
                            .then(response => response.json())
                            .then(tasks => {
                                taskList.innerHTML = '';
                                tasks.forEach(task => {
                                    const taskElement = document.createElement('div');
                                    taskElement.innerHTML = `
                                        <h3>${task.title}</h3>
                                        <p>${task.description}</p>
                                        <button class="deleteTaskButton" data-id="${task.id}">Delete</button>
                                    `;
                                    taskList.appendChild(taskElement);
                                });
                            });
                    } else {
                        console.error('Error deleting task:', response.status);
                    }
                });
            }
        }
    });
});