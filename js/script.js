'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
 
let toDoData = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];

/*
let toDoData = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
if(localStorage.getItem('todo'))
    toDoData = JSON.parse(localStorage.getItem('todo'))
else
    toDoData = []
*/
 
const render = function() {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''
    
    toDoData.forEach(function(item,index) {
        
        //localStorage.setItem("todo", JSON.stringify(toDoData)) 
       const li = document.createElement('li')
       li.classList.add('todo-item')
       li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
           '<div class="todo-buttons">' +
           '<button class="todo-remove"></button>' +
	       '<button class="todo-complete"></button>' +
           '</div>';

        if(item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }
        localStorage.setItem("todo", JSON.stringify(toDoData))
        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed
            render()
        })
        li.querySelector('.todo-remove').addEventListener('click', function() {
            li.remove()   
            toDoData.splice(index, 1);
            localStorage.setItem("todo", JSON.stringify(toDoData))
            render();
        })
    })    
}

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    if(headerInput.value === '') return false;
    const newToDo = {
        text: headerInput.value,
        completed: false
    }

    toDoData.push(newToDo)
    headerInput.value = ''
    render();
})

render();

