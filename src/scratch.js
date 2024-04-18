class Component {
  constructor (doc, componentId) {
    this.doc = doc
    this.id = componentId
  }

  get item () {
    return this.doc.querySelector(`#${this.id}`)
  }
}

export class Input extends Component {
  constructor (doc, componentId, tagName = 'input') {
    super(doc, componentId)
    this.tagName = tagName
  }

  get content () {
    return this.item.value
  }

  set content (value) {
    this.item.value = value
  }

  render () {
    const elem = this.doc.createElement(this.tagName)
    elem.id = this.id
    elem.classList.add('input')
    return elem
  }
}

class ReadOnlyComponent extends Component {
  get content () {
    return this.item.textContent
  }

  set content (value) {
    this.item.textContent = value
  }
}

export class Button extends ReadOnlyComponent {
  addListener (callback) {
    this.item.addEventListener('click', callback)
    this.listenerInfo = ['click', callback]
  }

  removeListener () {
    if (this.removeListener) {
      this.item.removeEventListener(...this.listenerInfo)
    }
  }

  render () {
    // render the button
    console.log('render button id: ', this.id)
    const newButton = this.doc.createElement('button')
    newButton.id = this.id
    return newButton
  }
}

export class NewProjectComponent {
  constructor (inputComponent, buttonComponent) {
    this.inputComponent = inputComponent
    this.buttonComponent = buttonComponent
  }

  get data () {
    return this.inputComponent.data
  }

  addListener (callback) {
    this.buttonComponent.addListener(callback)
  }

  get inputContent () {
    return this.inputComponent.content
  }
}

export class TaskField extends Component {
  constructor (doc, componentId, inputComponent, labelText) {
    super(doc, componentId)
    this.inputComponent = inputComponent
    this.labelText = labelText
  }

  #labelWrap (renderedElement, labelText) {
    const label = this.doc.createElement('label')
    label.textContent = labelText
    const div = this.doc.createElement('div')
    div.append(label, renderedElement)
    div.className = 'input-field'
    return div
  }

  render (inputClass) {
    const input = this.inputComponent.render()
    input.classList.add(inputClass)
    return this.#labelWrap(input, this.labelText)
  }
}

export class Task extends Component {
  constructor (doc, componentId) {
    super(doc, componentId)
    this.title = ''
    this.description = ''
    this.dueDate = ''
    this.priority = ''
  }

  #labelWrap (renderedElement, labelText) {
    const label = this.doc.createElement('label')
    label.textContent = labelText
    const div = this.doc.createElement('div')
    div.append(label, renderedElement)
    div.className = 'input-field'
    return div
  }

  #renderItem (tag, value, taskPropName) {
    const elem = this.doc.createElement(tag)
    elem.classList.add('input', taskPropName)
    elem.value = value
    elem.addEventListener('input', (event) => {
      this[taskPropName] = event.target.value
    })
    return elem
  }

  #renderTitle () {
    return this.#renderItem('input', this.title, 'title')
  }

  #renderDescription () {
    const elem = this.#renderItem('textarea', this.description, 'description')
    elem.rows = 4
    elem.cols = 35
    return elem
  }

  #renderDueDate () {
    const elem = this.#renderItem('input', this.dueDate, 'dueDate')
    elem.type = 'date'
    return elem
  }

  #renderPriority () {
    const elem = this.#renderItem('input', this.priority, 'priority')
    elem.type = 'number'
    elem.min = 1
    elem.max = 5
    return elem
  }

  #createListener (elem, prop) {

  }

  render () {
    console.log('render task id: ', this.id)
    const task = this.doc.createElement('div')
    task.id = this.id
    task.classList.add('task')
    task.append(
      this.#labelWrap(this.#renderTitle(), 'Title'),
      this.#labelWrap(this.#renderDescription(), 'Description'),
      this.#labelWrap(this.#renderDueDate(), 'Due Date'),
      this.#labelWrap(this.#renderPriority(), 'Priority')
    )
    return task
  }
}

export class Project extends Component {
  constructor (doc, projectId, projectName, projectButton) {
    super(doc, projectId)
    this.projectName = projectName
    this.projectButton = projectButton
    this.projectButton.addListener(this.render.bind(this))
    this.tasks = []
  }

  add () {
    const newTask = new Task(this.doc, `${this.id}${this.tasks.length}`)
    this.tasks.push(newTask)
    return newTask
  }

  remove (taskId) {
    delete this.tasks[taskId]
  }

  /*
  wraps the task list render with the project title and new task button
  */
  renderWrapper (renderTaskCallback) {
    // render the project
    renderTaskContainer.bind(this)(renderTaskCallback)
  }

  render () {
    this.renderWrapper(this.renderTaskList.bind(this))
  }

  renderTaskList () {
    // render the task list
    console.log('render task list')
    const taskList = this.doc.createElement('div')
    taskList.classList.add('task-list')
    taskList.append(...Object.values(this.tasks).map(task => task.render()))
    return taskList
  }
}

export class ProjectList extends Component {
  constructor (doc, componentId) {
    super(doc, componentId)
    this.projects = {}
  }

  #createProjectId (projectName) {
    let projectId = projectName.toLowerCase().replace(' ', '-')
    let i = 0
    let newId = projectId
    while (this.projects[`${newId}`] !== undefined) {
      newId = `${projectId}-${i}`
      i++
    }
    if (i > 0) {
      projectId = `${projectId}-${i}`
    }
    return projectId
  }

  add (projectName) {
    const projectId = this.#createProjectId(projectName)

    const projectButtonComponent = new Button(this.doc, projectId)

    // display the new project button
    const projectButton = projectButtonComponent.render()
    projectButton.textContent = projectName
    projectButton.type = 'button'
    this.item.appendChild(projectButton)

    const newProject = new Project(this.doc, projectId, projectName, projectButtonComponent)
    this.projects[projectId] = newProject
    return newProject
  }

  remove (projectId) {
    delete this.projects[projectId]
  }

  renderTaskList() {
    // render the project list
    console.log('render project list')
    const taskList = this.doc.createElement('div')
    taskList.classList.add('task-list')

    taskList.append(...Object.values(this.projects)
      .flatMap(project => project.tasks
        .map(task => task.render())
      ))
    return taskList
  }

  render () {
    renderTaskContainer.bind(this)(this.renderTaskList.bind(this))
  }
}

class ContainerOfList {
  constructor (listComponent, addListenerComponent) {
    this.listComponent = listComponent
    this.addListenerComponent = addListenerComponent
    this.addListenerComponent.addListener((event) => {
      event.preventDefault()
      this.add()
    })
  }

  add () {
    console.log(`add ${this.listComponent.item.id} via ${this.buttonComponent.item.id}`)
  }
}

export class ProjectContainer extends ContainerOfList {
  /*
    * Takes data from newProjectComponent and adds it to the projectListComponent
  */
  add () {
    this.listComponent.add(this.addListenerComponent.inputContent)
  }
}

export class TaskContainer extends ContainerOfList {
  constructor (title, taskList, newTaskButton) {
    super(taskList, newTaskButton)
    this.title = title
  }

  add () {
    this.taskList.add(this.title)
  }
}

/*
wraps the task list render with the project title and new task button
*/
function renderTaskContainer (renderTaskCallback) {
  // render the project
  console.log('render project id: ', this.id)
  const taskContainer = this.doc.querySelector('#task-container')
  taskContainer.innerHTML = ''
  const title = this.doc.createElement('h2')
  title.textContent = this.projectName

  const taskList = renderTaskCallback()

  const newButton = new Button(this.doc, 'new-task-button')
  const newTaskButton = newButton.render()
  newTaskButton.textContent = 'New Task'
  newTaskButton.type = 'button'
  newTaskButton.addEventListener('click', () => {
    const newTask = this.add()
    taskList.appendChild(newTask.render())
    window.scrollTo(0, document.body.scrollHeight)
  })
  taskContainer.append(title, taskList, newTaskButton)
}
