import './styles.css'
import * as component from './scratch'

class Main {
  static run (doc) {
    const inputComponent = new component.Input(doc, 'project-name-input')
    const buttonComponent = new component.Button(doc, 'add-project-button')
    const newProjectComponent = new component.NewProjectComponent(inputComponent, buttonComponent)
    const projectListComponent = new component.ProjectList(doc, 'project-list')
    const projectContainerComponent = new component.ProjectContainer(projectListComponent, newProjectComponent)

    const defaultProject = projectListComponent.add('Default Project')
    defaultProject.projectButton.removeListener()
    defaultProject.projectButton.addListener(() => {
      defaultProject.renderWrapper(projectListComponent.renderTaskList.bind(projectListComponent))
    })
    defaultProject.render()
  }

  static renderProjectList () {}
}

Main.run(document)
