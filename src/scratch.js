export class Component {
  constructor (doc, componentId) {
    this.doc = doc
    this.id = componentId
  }

  get item () {
    return this.doc.querySelector(`#${this.id}`)
  }
}

export class InputComponent extends Component {
  get content () {
    return this.item.value
  }

  set content (value) {
    this.item.value = value
  }
}

export class ReadOnlyComponent extends Component {
  get content () {
    return this.item.textContent
  }

  set content (value) {
    this.item.textContent = value
  }
}

export class ButtonComponent extends ReadOnlyComponent {
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

export class TaskComponent extends Component {
  constructor (doc, componentId, projectName) {
    super(doc, componentId)
    this.projectName = projectName
  }
}

export class ProjectComponent extends Component {
  constructor (doc, projectId, projectButton) {
    super(doc, projectId)
    this.projectButton = projectButton
    this.projectButton.addListener(this.render.bind(this))
    this.tasks = {}
  }

  add (taskId) {
    this.tasks[taskId] = new TaskComponent(this.doc, this.projectName)
  }

  remove (taskId) {
    delete this.tasks[taskId]
  }

  render () {
    // render the project
    console.log('render project id: ', this.id)
  }
}

export class ProjectListComponent extends Component {
  constructor (doc, componentId) {
    super(doc, componentId)
    this.projects = {}
  }

  createProjectId (projectName) {
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
    const projectId = this.createProjectId(projectName)

    const projectButtonComponent = new ButtonComponent(this.doc, projectId)

    // display the new project button
    const projectButton = projectButtonComponent.render()
    projectButton.textContent = projectName
    projectButton.type = 'button'
    this.item.appendChild(projectButton)

    const newProject = new ProjectComponent(this.doc, projectId, projectButtonComponent)
    this.projects[projectId] = newProject
  }

  remove (projectId) {
    delete this.projects[projectId]
  }

  render () {
    // render the project list
    console.log('render project list')
  }
}

export class ProjectContainerComponent {
  constructor (projectListComponent, newProjectComponent) {
    this.projectListComponent = projectListComponent
    this.newProjectComponent = newProjectComponent
    this.newProjectComponent.addListener((event) => {
      event.preventDefault()
      this.add()
    })
  }

  static addListener (callback) {
    this.newProjectComponent.addListener(callback)
  }

  /*
    * Takes data from newProjectComponent and adds it to the projectListComponent
  */
  add () {
    this.projectListComponent.add(this.newProjectComponent.inputContent)
  }
}
