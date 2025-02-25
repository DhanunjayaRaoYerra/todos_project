let todoItemsContainer = document.getElementById("todoItemsContainer");
let onAddTodoElement = document.getElementById("onAddTodo");
let saveButton = document.getElementById("saveButton");
let todoListV = [{
        text: "Learn HTML",
        uniqueNo: 1,
    },
    {
        text: "Learn CSS",
        uniqueNo: 2,
    },
    {
        text: "Learn JavaScript",
        uniqueNo: 3,
    }
];

function getTodoList() {
    let val = localStorage.getItem("todolist");
    let stringVal = JSON.parse(val);
    if (stringVal === null) {
        return [];
    } else {
        return stringVal;
    }
}

let todoList = getTodoList();
let todoCount = todoList.length;

saveButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
};

function onDeleteTodo(todoId) {
    let todoIdElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoIdElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}


function onToDoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let changeData = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachItem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let requiredElement = todoList[changeData];
    if (requiredElement.isChecked === true) {
        requiredElement.isChecked = false;
    } else {
        requiredElement.isChecked = true;
    }
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkboxId" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onToDoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteContainerElement = document.createElement("i");
    deleteContainerElement.classList.add("far","fa-trash-alt","delete-icon");
    deleteContainerElement.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteContainer.appendChild(deleteContainerElement);
}

function addElement() {

    todoCount = todoCount + 1;
    let userElement = document.getElementById("todoUserInput");
    let userElementValue = userElement.value;
    if (userElementValue === "") {
        alert("Enter valid Text");
        return;
    }
    let newTodo = {
        text: userElementValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userElement.value = "";
}

onAddTodoElement.onclick = function() {
    addElement();
};

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
