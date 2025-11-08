import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/projects/:id - Obtiene un proyecto
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const project = db.getProjectById(projectId)

    if (!project) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener proyecto" }, { status: 500 })
  }
}

// PUT /api/v1/projects/:id - Actualiza un proyecto
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)
    const body = await request.json()

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const updatedProject = db.updateProject(projectId, body)

    if (!updatedProject) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Proyecto actualizado",
      project: updatedProject,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 })
  }
}

// DELETE /api/v1/projects/:id - Elimina un proyecto
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const deleted = db.deleteProject(projectId)

    if (!deleted) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Proyecto eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 })
  }
}
