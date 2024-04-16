import todoContainer from './components.js'
import './styles.css'

document.querySelector('#new-task').addEventListener('click', () => {
  const todo = todoContainer(document)
  document.querySelector('#todo-list').append(todo)
  window.scrollTo(0, document.querySelector('#todo-list').scrollHeight)
})

document.querySelector('#add-project').addEventListener('click', (event) => {
  event.preventDefault()
  const projectInput = document.querySelector('#project-name-input')
  const projectName = projectInput.value.trim()
  const projectSlug = projectName.toLowerCase().replace(' ', '-')
  if (projectSlug === '') {
    return
  }
  if (document.querySelector(`#${projectSlug}`)) {
    alert(`Project ${projectName} already exists! Please enter a different name.`)
    return
  }
  const project = document.createElement('button')
  project.textContent = projectName
  project.id = projectSlug
  project.className = 'project-button'
  document.querySelector('#project-list').append(project)
  projectInput.value = ''
  projectInput.focus()
})

