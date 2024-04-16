// Description: This file contains the todo class and its methods

/*
* Creates a new todo container
*/
function createTextInput (doc, className, labelName) {
  const inputDiv = doc.createElement('div')
  inputDiv.classList.add('input-field')

  const label = doc.createElement('label')
  label.for = className
  label.textContent = labelName

  const input = doc.createElement('input')
  input.type = 'text'
  input.classList.add(className)
  inputDiv.append(label, input)
  return inputDiv
}

export default function todoContainer (doc) {
  const todo = doc.createElement('div')
  todo.classList.add('todo')

  const titleDiv = createTextInput(doc, 'title', 'Title: ')
  const descDiv = createTextInput(doc, 'description', 'Description: ')
  const dueDataDiv = createTextInput(doc, 'dueDate', 'Due Date: ')
  const priorityDiv = createTextInput(doc, 'priority', 'Priority: ')

  todo.append(titleDiv, descDiv, dueDataDiv, priorityDiv)
  return todo
}
