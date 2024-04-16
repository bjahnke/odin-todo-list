// Description: This file contains the todo class and its methods

/*
* Creates a new todo container
*/
function createTodoField (doc, className, labelName, type = '', tag = 'input') {
  const inputDiv = doc.createElement('div')
  inputDiv.classList.add('input-field')

  const label = doc.createElement('label')
  label.for = className
  label.textContent = labelName

  const input = doc.createElement(tag)
  if (type !== '') {
    input.type = type
  }
  input.classList.add(className, 'input')
  inputDiv.append(label, input)
  return inputDiv
}

export default function todoContainer (doc) {
  const todo = doc.createElement('div')
  todo.classList.add('todo')

  const deleteButton = doc.createElement('button')
  deleteButton.classList.add('delete')
  deleteButton.textContent = 'X'

  deleteButton.addEventListener('click', () => {
    todo.remove()
  })

  const titleDiv = createTodoField(doc, 'title', 'Title: ', 'text')
  const descDiv = createTodoField(doc, 'description', 'Description: ', '', 'textarea')
  descDiv.querySelector('textarea').rows = 4
  descDiv.querySelector('textarea').cols = 35

  const dueDataDiv = createTodoField(doc, 'dueDate', 'Due Date: ', 'date')
  const priorityDiv = createTodoField(doc, 'priority', 'Priority: ', 'number')
  priorityDiv.querySelector('input').min = 1
  priorityDiv.querySelector('input').max = 5

  todo.append(deleteButton, titleDiv, descDiv, dueDataDiv, priorityDiv)
  return todo
}

function newProjectDiv (doc, name) {}

/*
* Creates a new project container
contains title
*/
export function projectContainer (doc) {
  const project = doc.createElement('div')
  project.classList.add('project')

  const titleDiv = createTodoField(doc, 'title', 'Title: ', 'text')
  const descDiv = createTodoField(doc, 'description', 'Description: ', '', 'textarea')
  descDiv.querySelector('textarea').rows = 4
  descDiv.querySelector('textarea').cols = 35

  project.append(titleDiv, descDiv)
  return project
}
