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
  get content () {
    return this.item.value
  }

  set content (value) {
    this.item.value = value
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

export class Task extends Component {
  constructor (doc, componentId, projectName) {
    super(doc, componentId)
    this.projectName = projectName
    this.task = ''
    this.description = ''
    this.dueDate = ''
    this.priority = ''
  }

  #renderTitle () {
    const elem = this.doc.createElement('input')
    elem.classList.add('title')
    elem.textContent = this.title
    return elem
  }

  #renderDescription () {
    const elem = this.doc.createElement('textarea')
    elem.rows = 4
    elem.cols = 35
    elem.classList.add('description')
    elem.textContent = this.description
    return elem
  }

  #renderDueDate () {
    const elem = this.doc.createElement('input')
    elem.type = 'date'
    elem.classList.add('due-date')
    elem.textContent = this.dueDate
    return elem
  }

  #renderPriority () {
    const elem = this.doc.createElement('input')
    elem.type = 'number'
    elem.min = 1
    elem.max = 5
    elem.classList.add('priority')
    elem.textContent = this.priority
    return elem
  }

  render () {
    console.log('render task id: ', this.id)
    const task = this.doc.createElement('div')
    task.id = this.id
    task.classList.add('task')
    task.append(
      this.#renderTitle(),
      this.#renderDescription(),
      this.#renderDueDate(),
      this.#renderPriority()
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
    const newTask = new Task(this.doc, `${this.projectId}${this.tasks.length}`, this.projectName)
    this.tasks.push(newTask)
    return newTask
  }

  remove (taskId) {
    delete this.tasks[taskId]
  }

  render () {
    // render the project
    console.log('render project id: ', this.id)
    const taskContainer = this.doc.querySelector('#task-container')
    taskContainer.innerHTML = ''
    const title = this.doc.createElement('h2')
    title.textContent = this.projectName

    const taskList = this.doc.createElement('div')
    taskList.classList.add('task-list')
    taskList.append(...Object.values(this.tasks).map(task => {
      return task.render()
    }))

    const newButton = new Button(this.doc, 'new-task-button')
    const newTaskButton = newButton.render()
    newTaskButton.textContent = 'New Task'
    newTaskButton.type = 'button'
    newTaskButton.addEventListener('click', () => {
      const newTask = this.add()
      taskList.appendChild(newTask.render())
    })
    taskContainer.append(title, taskList, newTaskButton)
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

  render () {
    // render the project list
    console.log('render project list')
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
