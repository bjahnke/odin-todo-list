import todoContainer from './todo.js'
import './styles.css'

document.querySelector('#new-task').addEventListener('click', () => {
  const todo = todoContainer(document)
  document.querySelector('#todo-list').append(todo)
  window.scrollTo(0, document.querySelector('#todo-list').scrollHeight)
})

document.querySelector('#add-project').addEventListener('click', (event) => {
  event.preventDefault()
  const projectInput = document.querySelector('#project-name-input')
  const projectName = projectInput.value
  if (projectName === '') {
    return
  }
  if (document.querySelector(`#${projectName}`)) {
    alert(`Project ${projectName} already exists! Please enter a different name.`)
    return
  }
  const project = document.createElement('button')
  project.textContent = projectName
  project.id = projectName
  project.className = 'project-button'
  document.querySelector('#project-list').append(project)
  projectInput.value = ''
  projectInput.focus()
})

document.querySelector('#projects').addEventListener('click', (event) => {
  event.preventDefault()
  const projectInput = document.querySelector('#project-name-input')
  const projectName = projectInput.value
  if (projectName === '') {
    return
  }
  if (document.querySelector(`#${projectName}`)) {
    alert(`Project ${projectName} already exists! Please enter a different name.`)
    return
  }
  const project = document.createElement('button')
  project.textContent = projectName
  project.id = projectName
  project.className = 'project-button'
  document.querySelector('#project-list').append(project)
  projectInput.value = ''
  projectInput.focus()

  // Scroll to the bottom of the project list
  window.scrollTo(0, document.querySelector('#project-list').scrollHeight)
})