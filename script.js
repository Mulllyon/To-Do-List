const elements = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
}

var tasksList = []

if (localStorage.getItem('savedTasks') != null) {
    tasksList = JSON.parse(localStorage.getItem('savedTasks'))
    taskRender(tasksList)
}

elements.add.onclick = function () {
    if (elements.new.value != '' && isTaskExist(elements.new.value) === false) {
        addTask(elements.new.value)
        elements.new.value = ''
    }
}

function isTaskExist(text) {
    let isExist = false
    tasksList.forEach((task) = function (task) {
        if (task.text === text) {
            alert('Задача уже существует!')
            isExist = true;
        }
    })
    return isExist;
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        isComplete: false
    }
    tasksList.unshift(task)
    taskRender(tasksList)
}

elements.tasks.onclick = function (event) {
    if (event.target.classList.contains('todo__task-checkbox')) {
        changeTaskStatus(event.target.parentElement.getAttribute('id'))
    }
    else if (event.target.classList.contains('todo__task-delete')) {
        deleteTask(event.target.parentElement.getAttribute('id'))
    }
    else  if(event.target.classList.contains('todo__task-change')) {
        changeTask(event.target.parentElement.getAttribute('id'))
    }
}

function changeTaskStatus(taskId) {
    tasksList.forEach((task) = function (task) {
        if (task.id == taskId) {
            task.isComplete = !task.isComplete
            taskRender(tasksList)
        }
    })
}

function deleteTask(taskId) {
    tasksList.forEach((task) = function (task) {
        if (task.id == taskId) {
            tasksList.splice(tasksList.indexOf(task), 1)
            taskRender(tasksList)
        }
    })
}

function changeTask(taskId) {
    tasksList.forEach((task) = function (task) {
        if (task.id == taskId) {
            var changedName = prompt('Введите новое название задачи!')
            if (changedName != '' && isTaskExist(changedName) === false) {
                task.text = changedName;
            }
            taskRender(tasksList)
        }
    })
}

function taskRender(tasksList) {
    let tasksHtml=''
    tasksList.forEach((task) = function (task) {
        let isTaskComplete
        let isChecked
        if (task.isComplete === true) {
            isTaskComplete = 'todo__task todo__task-complete'
            isChecked = 'checked'
        }
        else {
            isTaskComplete = 'todo__task'
            isChecked = ''
        }
        const taskHtml = `
        <div id="${task.id}" class="${isTaskComplete}">
            <input class="todo__task-checkbox" type="checkbox" ${isChecked}>
            <div class="todo__task-text">${task.text}</div>
            <button class="todo__task-change">✎</button>
            <button class="todo__task-delete">✗</button>
        </div>`
        tasksHtml = tasksHtml + taskHtml
    })
    elements.tasks.innerHTML = tasksHtml
    localStorage.setItem('savedTasks', JSON.stringify(tasksList));
}
