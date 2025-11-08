import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/v1/people - Lista todas las personas
export async function GET() {
  try {
    const people = db.getAllPeople()
    return NextResponse.json(people)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener personas" }, { status: 500 })
  }
}

// POST /api/v1/people - Crea una persona
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    if (!name || !email || !role) {
      return NextResponse.json({ error: "name, email y role son requeridos" }, { status: 400 })
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const person = db.createPerson({ name, email, role })
    return NextResponse.json({ message: "Persona creada", person }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear persona" }, { status: 500 })
  }
}
