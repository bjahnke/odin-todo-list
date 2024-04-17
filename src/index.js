import './styles.css'
import { InputComponent, ButtonComponent, NewProjectComponent, ProjectListComponent, ProjectContainerComponent } from './scratch'

function main (doc) {
  const inputComponent = new InputComponent(doc, 'project-name-input')
  const buttonComponent = new ButtonComponent(doc, 'add-project-button')
  const newProjectComponent = new NewProjectComponent(inputComponent, buttonComponent)
  const projectListComponent = new ProjectListComponent(doc, 'project-list')
  const projectContainerComponent = new ProjectContainerComponent(projectListComponent, newProjectComponent)

  projectListComponent.add('Default Project')
}

main(document)
