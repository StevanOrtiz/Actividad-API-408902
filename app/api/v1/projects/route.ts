import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/projects - Lista todos los proyectos
export async function GET() {
  try {
    const projects = db.getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 })
  }
}

// POST /api/v1/projects - Crea un nuevo proyecto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name || !description) {
      return NextResponse.json({ error: "name y description son requeridos" }, { status: 400 })
    }

    const project = db.createProject({ name, description })
    return NextResponse.json({ message: "Proyecto creado", project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear proyecto" }, { status: 500 })
  }
}
