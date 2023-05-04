var tasksList = []

const elements = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks')
}

loadTasks()

function loadTasks() {
    if (localStorage.getItem('savedTasks') != null) {
        tasksList = JSON.parse(localStorage.getItem('savedTasks'))
        tasksRender(tasksList)
    }
}

elements.add.onclick = function () {
    if (elements.new.value != '' && isTaskExist(elements.new.value) === false) {
        addTask(elements.new.value)
        elements.new.value = ''
    }
}

elements.new.onkeydown = function (e) {
    if (e.key === 'Enter') {
        if (elements.new.value != '' && isTaskExist(elements.new.value) === false) {
            addTask(elements.new.value)
            elements.new.value = ''
        }
    }
}

elements.tasks.onclick = function (e) {
    if (e.target.classList.contains('todo__task-checkbox')) {
        changeTaskStatus(e.target.parentElement.getAttribute('id'))
    }
    else if (e.target.classList.contains('todo__task-change')) {
        changeTask(e.target.parentElement.getAttribute('id'))
    }
    else if (e.target.classList.contains('todo__task-delete')) {
        deleteTask(e.target.parentElement.getAttribute('id'))
    }
}

function isTaskExist(text) {
    let isExist = false
    tasksList.forEach((task) = function (task) {
        if (task.text === text) {
            alert ('Задача уже существует!')
            isExist = true
        }
    })
    return isExist
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        isComplete: false
    }
    tasksList.unshift(task)
    tasksRender(tasksList)
}

function changeTaskStatus(id) {
    tasksList.forEach((task) = function (task) {
        if (task.id == id) {
            task.isComplete = !task.isComplete
            tasksRender(tasksList)
        }
    })
}

function changeTask(id) {
    let changedName = prompt('Введите новое название задачи!')
    if (changedName === '') {
        alert('Вы ничего не ввели!')
    }
    else {
        if (isTaskExist(changedName) === false) {
            tasksList.forEach((task) = function (task) {
                if (task.id == id) {
                    task.text = changedName
                    tasksRender(tasksList)
                }
            })
        }
    }
}

function deleteTask(id) {
    tasksList.forEach((task) = function (task) {
        if (task.id == id) {
            tasksList.splice(tasksList.indexOf(task), 1)
            tasksRender(tasksList)
        }
    })
}

function changeTaskStatus(id) {
    tasksList.forEach((task) = function (task) {
        if (task.id == id) {
            task.isComplete = !task.isComplete
            tasksRender(tasksList)
        }
    })
}

function tasksRender(list) {
    let tasksHTML = ''
    let isTaskComplete
    list.forEach((task) = function (task) {
        if (task.isComplete === true) {
            isTaskComplete = 'checked'
        }
        else {
            isTaskComplete = ''
        }
        const taskHTML = `
        <div id="${task.id}" class="todo__task ${isTaskComplete}">
            <input class="todo__task-checkbox" type="checkbox" ${isTaskComplete}/>
            <div class="todo__task-text">${task.text}</div>
            <button class="todo__task-change">✎</button>
            <button class="todo__task-delete">✗</button>
        </div>`
        tasksHTML = tasksHTML + taskHTML
    })
    elements.tasks.innerHTML = tasksHTML
    localStorage.setItem('savedTasks', JSON.stringify(tasksList))
}
