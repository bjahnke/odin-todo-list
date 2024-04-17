// Description: This file contains the task class and its methods

/*
* Creates a new task container
*/

/*
* Creates a new task container
*/
export default function taskContainer (doc) {
  const task = doc.createElement('div')
  task.classList.add('task')

  const topDiv = doc.createElement('div')
  topDiv.classList.add('top')
  topDiv.classList.add('input-field')

  const deleteButton = doc.createElement('button')
  deleteButton.classList.add('delete')
  deleteButton.textContent = 'X'

  deleteButton.addEventListener('click', () => {
    task.remove()
  })

  const projectField = createtaskField(doc, 'project', 'Project: ', 'text')
  projectField.className = 'project-link'

  topDiv.append(projectField, deleteButton)

  const titleDiv = createtaskField(doc, 'title', 'Title: ', 'text')
  const descDiv = createtaskField(doc, 'description', 'Description: ', '', 'textarea')
  descDiv.querySelector('textarea').rows = 4
  descDiv.querySelector('textarea').cols = 35

  const dueDataDiv = createtaskField(doc, 'due-date', 'Due Date: ', 'date')
  const priorityDiv = createtaskField(doc, 'priority', 'Priority: ', 'number')
  priorityDiv.querySelector('input').min = 1
  priorityDiv.querySelector('input').max = 5

  const horizontalElemDiv = doc.createElement('div')
  horizontalElemDiv.classList.add('horizontal-elements')
  horizontalElemDiv.classList.add('input-field')
  horizontalElemDiv.append(dueDataDiv, priorityDiv)

  task.append(topDiv, titleDiv, descDiv, horizontalElemDiv)
  return task
}
function createtaskField (doc, className, labelName, type = '', tag = 'input') {
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

class taskData {
  constructor (doc, field, labelName) {
    this.doc = doc
    this.label = taskData.createLabel(labelName)
    this.field = field
    this.labelName = labelName
    this.container = doc.createElement('div')
  }

  static createLabel (labelName) {
    const label = this.doc.createElement('label')
    label.textContent = labelName
    return label
  }

  static createDiv (doc, label, field) {
    const div = doc.createElement('div')
    div.classList.add(label, field)
    return div
  }
}

class taskComponent {
  constructor (doc) {
    /*
    Has:
    - title: label+input:text
    - description: label+textarea
    - dueDate: label+input:date
    - priority: label+input:number
    - project: label+input:text
    - deleteButton: button

    All fields are given input
    */
    this.doc = doc
    this.taskData = new Task()
    self.task = doc.createElement('div')
  }

  createTitleField (doc) {
    const titleDiv = createtaskField(doc, 'title', 'Title: ', 'text')
    return titleDiv
  }

  createDescriptionField (doc) {
    const descDiv = createtaskField(doc, 'description', 'Description: ', '', 'textarea')
    descDiv.querySelector('textarea').rows = 4
    descDiv.querySelector('textarea').cols = 35
    return descDiv
  }

  createDueDateField (doc) {
    const dueDataDiv = createtaskField(doc, 'due-date', 'Due Date: ', 'date')
    return dueDataDiv
  }

  createPriorityField (doc) {
    const priorityDiv = createtaskField(doc, 'priority', 'Priority: ', 'number')
    priorityDiv.querySelector('input').min = 1
    priorityDiv.querySelector('input').max = 5
    return priorityDiv
  }

  createProjectField (doc) {
    const projectField = createtaskField(doc, 'project', 'Project: ', 'text')
    projectField.className = 'project-link'
    return projectField
  }

  createDeleteButton (doc) {
    const deleteButton = doc.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'X'
    deleteButton.addEventListener('click', () => {
      this.task.remove()
    })
    return deleteButton
  }
}

function newProjectDiv (doc, name) {}

/*
* Creates a new project container
contains title
*/
export function projectContainer (doc) {
  const project = doc.createElement('div')
  project.classList.add('project')

  const titleDiv = createtaskField(doc, 'title', 'Title: ', 'text')
  const descDiv = createtaskField(doc, 'description', 'Description: ', '', 'textarea')
  descDiv.querySelector('textarea').rows = 4
  descDiv.querySelector('textarea').cols = 35

  project.append(titleDiv, descDiv)
  return project
}
