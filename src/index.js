import todoContainer from './todo.js'
import './styles.css'

document.querySelector('#add-new').addEventListener('click', () => {
  const todo = todoContainer(document)
  document.querySelector('#todo-container').append(todo)
})
