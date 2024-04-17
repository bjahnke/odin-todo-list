import { Project } from './model.js'

/*
Project Collection class
Sets up interactions between front and back end
*/
export class ProjectCollection {
  constructor (io) {
    this.projects = new Map()
    this.io = io
  }

  /*
  - Creates a new project and adds it to the project collection
  - uses IO to render the project button
  */
  add (projectName) {
    const project = new Project(projectName, this.io)
    this.projects.set(projectName, project)
    return project.render()
  }

  remove (project) {
    this.projects = this.projects.filter(p => p !== project)
  }
}
