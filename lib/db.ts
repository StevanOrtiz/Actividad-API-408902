// Database setup with in-memory storage (can be replaced with SQLite/PostgreSQL)
export interface Project {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: number
  title: string
  description: string
  status: "pending" | "in-progress" | "done"
  projectId: number
  createdAt: Date
  updatedAt: Date
}

export interface Person {
  id: number
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

// In-memory database
class Database {
  private projects: Map<number, Project> = new Map()
  private tasks: Map<number, Task> = new Map()
  private people: Map<number, Person> = new Map()

  private projectIdCounter = 1
  private taskIdCounter = 1
  private personIdCounter = 1

  // Projects CRUD
  getAllProjects(): Project[] {
    return Array.from(this.projects.values())
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.get(id)
  }

  createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
    const project: Project = {
      id: this.projectIdCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.projects.set(project.id, project)
    return project
  }

  updateProject(id: number, data: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Project | null {
    const project = this.projects.get(id)
    if (!project) return null

    const updatedProject = {
      ...project,
      ...data,
      updatedAt: new Date(),
    }
    this.projects.set(id, updatedProject)
    return updatedProject
  }

  deleteProject(id: number): boolean {
    return this.projects.delete(id)
  }

  // Tasks CRUD
  getAllTasks(): Task[] {
    return Array.from(this.tasks.values())
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.get(id)
  }

  createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const task: Task = {
      id: this.taskIdCounter++,
      status: "pending",
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.tasks.set(task.id, task)
    return task
  }

  updateTask(id: number, data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>): Task | null {
    const task = this.tasks.get(id)
    if (!task) return null

    const updatedTask = {
      ...task,
      ...data,
      updatedAt: new Date(),
    }
    this.tasks.set(id, updatedTask)
    return updatedTask
  }

  deleteTask(id: number): boolean {
    return this.tasks.delete(id)
  }

  // People CRUD
  getAllPeople(): Person[] {
    return Array.from(this.people.values())
  }

  getPersonById(id: number): Person | undefined {
    return this.people.get(id)
  }

  createPerson(data: Omit<Person, "id" | "createdAt" | "updatedAt">): Person {
    const person: Person = {
      id: this.personIdCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.people.set(person.id, person)
    return person
  }

  updatePerson(id: number, data: Partial<Omit<Person, "id" | "createdAt" | "updatedAt">>): Person | null {
    const person = this.people.get(id)
    if (!person) return null

    const updatedPerson = {
      ...person,
      ...data,
      updatedAt: new Date(),
    }
    this.people.set(id, updatedPerson)
    return updatedPerson
  }

  deletePerson(id: number): boolean {
    return this.people.delete(id)
  }
}

// Singleton instance
export const db = new Database()
