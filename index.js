let todoItemsContainer = document.getElementById("todoItemsContainer");
let onAddButtonElement = document.getElementById("onAddButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoList (){
    let stringifiedTodoList = localStorage.getItem("totdoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList === null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}
let todoList = getTodoList();

saveTodoButton.onclick = function(){
    localStorage.setItem("totdoList", JSON.stringify(todoList));
}


function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement)
    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })
    todoList.splice(deleteIndex, 1);
    //console.log(todoList);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    //console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelId);
    
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })
    let todoObject = todoList[todoObjectIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
}


function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function(){
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    todoElement.appendChild(inputElement);



    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo(){
    let todoUserInput = document.getElementById("todoUserInput");
    let userInput = todoUserInput.value;
    if(userInput === ""){
        alert("Enter valid input");
        return;
    }

    let todosCount = todoList.length;
    todosCount = todosCount + 1;
    let newTodo = {
        text : userInput,
        uniqueNo : todosCount,
        isChecked : false
    }
    //console.log(todoList);
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";
    
}

onAddButtonElement.onclick = function(){
    onAddTodo();
}

for (let eachTodo of todoList){
    createAndAppendTodo(eachTodo);
}