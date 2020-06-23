//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

todoButton.addEventListener('click',addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);
document.addEventListener("DOMContentLoaded",getTodos); //if the content

														//or webpage 
														//is loaded then
														// the function 
														//will work


//Functions

function addToDo(event){
	// console.log('hello');

	event.preventDefault();    //prevents form submission
 
	//todo div

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	//create li
	const newToDo = document.createElement('li');
	// newToDo.innerText = 'Hey!';
	newToDo.innerText = todoInput.value;
	newToDo.classList.add('todo-item');
	todoDiv.appendChild(newToDo);

	//add todo to local storage

	saveLocalTodos(todoInput.value);

	//check mark
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	//trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);


	//append to list
	todoList.appendChild(todoDiv);

	//clear input field
	todoInput.value = "";

}

function deleteCheck(e) {
	const item = e.target;

	//delete todo

	if(item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;

		//animation

		todo.classList.add("fall");  //the item doesnt get removed 
									// just the opacity gets 0 
									// with only this line
		// todo.remove(); 
		
		removeLocalTodos(todo);

//this event waits for the animation to end then removes the todo 
		
		todo.addEventListener("transitionend", function() {
			todo.remove();
		})

	}

	//check mark

	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		  todo.classList.toggle('completed');
		 // toggle toggles between 
		//elements to hide or show
	}

}

//filtering

function filterTodo(e) {

const todos = todoList.childNodes;
// console.log(todos);

todos.forEach(function(todo) {   //value option of the filter
	switch(e.target.value) {
		case "all":
			todo.style.display= "flex";
			break;

		case "completed":

			if (todo.classList.contains("completed")) {
				todo.style.display = "flex"; 
				// todo.style.display = "block"; //ruins the design

			} else {
				todo.style.display = "none"; 


			}
			break;

		case "uncompleted":
			if(!todo.classList.contains("completed")) {
				todo.style.display = "flex"; 

			} else {

				todo.style.display = "none"; 

			}
			break;


	}


});

}


//save the todos to local storage

function saveLocalTodos(todo){

	let todos;
	if (localStorage.getItem("todos") === null) {

		todos = [];

	}else {
		todos = JSON.parse(localStorage.getItem("todos"));
		//from server, data is always got in string.
		//json.parse converts it to obj
	}

	todos.push(todo);
	localStorage.setItem("todos",JSON.stringify(todos));

	//json.stringify converts obj to string 
}



//showing the todos after load

function getTodos()
{

	let todos;
	if (localStorage.getItem("todos") === null) {

		todos = [];

	}else {
		todos = JSON.parse(localStorage.getItem("todos"));
		//from server, data is always got in string.
		//json.parse converts it to obj
	}



	todos.forEach(function(todo){

		//todo div

		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		//create li
		const newToDo = document.createElement('li');
		// newToDo.innerText = 'Hey!';
		newToDo.innerText = todo;  //changed part 
		newToDo.classList.add('todo-item');
		todoDiv.appendChild(newToDo);

		 
		//check mark
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);

		//trash button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);


		//append to list
		todoList.appendChild(todoDiv);

	});

}

//remove the todos from the local storage
function removeLocalTodos(todo){

	let todos;
	if (localStorage.getItem("todos") === null) {

		todos = [];

	}else {
		todos = JSON.parse(localStorage.getItem("todos"));
		//from server, data is always got in string.
		//json.parse converts it to obj
	}

	// const todoIndex = console.log(todo.children[0].innerText);
	const todoIndex = todo.children[0].innerText;//this gets the 
											// first element [0]
											//among the 3 returned
											//and gets the text


	// console.log(todos.splice(todos.indexOf(todoIndex),1));
	  todos.splice(todos.indexOf(todoIndex),1);

	  localStorage.setItem("todos", JSON.stringify(todos));
	 										

}

//  const todos = ['apple', 'john', 'donut' , 'babyboy'];
 
// // console.log(todos.indexOf('john'));

// const johnindex = todos.indexOf('john');

// todos.splice(johnindex,1);

// console.log(todos);