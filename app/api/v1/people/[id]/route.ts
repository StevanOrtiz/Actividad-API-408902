import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/people/:id - Obtiene una persona
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const personId = Number.parseInt(id)

    if (isNaN(personId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const person = db.getPersonById(personId)

    if (!person) {
      return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 })
    }

    return NextResponse.json(person)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener persona" }, { status: 500 })
  }
}

// PUT /api/v1/people/:id - Actualiza una persona
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const personId = Number.parseInt(id)
    const body = await request.json()

    if (isNaN(personId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    // Validar email si se proporciona
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ error: "Email inválido" }, { status: 400 })
      }
    }

    const updatedPerson = db.updatePerson(personId, body)

    if (!updatedPerson) {
      return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Persona actualizada",
      person: updatedPerson,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar persona" }, { status: 500 })
  }
}

// DELETE /api/v1/people/:id - Elimina una persona
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const personId = Number.parseInt(id)

    if (isNaN(personId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const deleted = db.deletePerson(personId)

    if (!deleted) {
      return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Persona eliminada" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar persona" }, { status: 500 })
  }
}
