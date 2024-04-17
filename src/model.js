/*
*/
export class Project {
  constructor (io, name) {
    this.io = io
    this.name = name
    this.tasks = []
  }

  add () {
    const task = new Task(this.name)
    this.tasks.push(task)
    return task.render()
  }

  remove (idx) {
    this.tasks.splice(idx, 1)
  }

  renderTaskList () {
    return this.tasks.map(task => task.render())
  }

  render () {
    const projectButton = this.doc.createElement('button')
    projectButton.type = 'button'
    // projectButton.classList.add('project-button')
    projectButton.textContent = this.name
    projectButton.id = this.name.toLowerCase().replace(' ', '-')
    projectButton.addEventListener('click', this.io.replaceTaskDisplay(this.renderTaskList))
    return projectButton
  }
}

class Task {
  constructor (project, title = '', description = '', dueDate = '', priority = '') {
    this.project = project
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }

  static updateFieldListener (fieldElem) {
    fieldElem.addEventListener('change', () => {
      // map fieldElem to attribute
    })
  }

  static renderProject (project, cd) {
    const div = doc.createElement('p')
    div.classList.add('project')
    div.textContent = project
    return div
  }

  static renderTitle (title) {
    const div = doc.createElement('input')
    div.classList.add('title')
    div.textContent = title
    return div
  }

  static renderDescription (description) {
    const div = doc.createElement('textarea')
    div.classList.add('description')
    div.textContent = description
    return div
  }

  static renderDueDate (dueDate) {
    const div = doc.createElement('input')
    div.classList.add('due-date')
    div.textContent = dueDate
    return div
  }

  static renderPriority (priority) {
    const div = doc.createElement('input')
    div.classList.add('priority')
    div.textContent = priority
    return div
  }

  render (doc) {
    const div = doc.createElement('div')
    div.classList.add('task')
    div.append(
      Task.renderProject(this.project),
      Task.renderTitle(this.title),
      Task.renderDescription(this.description),
      Task.renderDueDate(this.dueDate),
      Task.renderPriority(this.priority)
    )
    return div
  }
}
