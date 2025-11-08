import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/tasks - Lista todas las tareas
export async function GET() {
  try {
    const tasks = db.getAllTasks()
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tareas" }, { status: 500 })
  }
}

// POST /api/v1/tasks - Crea una nueva tarea
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, projectId } = body

    if (!title || !description || !projectId) {
      return NextResponse.json({ error: "title, description y projectId son requeridos" }, { status: 400 })
    }

    // Verificar que el proyecto existe
    const project = db.getProjectById(projectId)
    if (!project) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    const task = db.createTask({ title, description, projectId, status: "pending" })
    return NextResponse.json({ message: "Tarea creada", task }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tarea" }, { status: 500 })
  }
}
