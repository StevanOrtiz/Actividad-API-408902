import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/tasks/:id - Obtiene una tarea
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = Number.parseInt(id)

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const task = db.getTaskById(taskId)

    if (!task) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tarea" }, { status: 500 })
  }
}

// PUT /api/v1/tasks/:id - Actualiza una tarea
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = Number.parseInt(id)
    const body = await request.json()

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const updatedTask = db.updateTask(taskId, body)

    if (!updatedTask) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Tarea actualizada",
      task: updatedTask,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar tarea" }, { status: 500 })
  }
}

// DELETE /api/v1/tasks/:id - Elimina una tarea
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = Number.parseInt(id)

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const deleted = db.deleteTask(taskId)

    if (!deleted) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tarea eliminada" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tarea" }, { status: 500 })
  }
}
