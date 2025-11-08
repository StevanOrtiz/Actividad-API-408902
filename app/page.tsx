import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">API REST - Gestión de Proyectos</h1>
          <p className="text-lg text-muted-foreground">Desarrollo de Software II - Unicatólica</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Projects</h2>
            <p className="mb-4 text-sm text-muted-foreground">Gestión de proyectos</p>
            <code className="block rounded bg-muted p-2 text-xs">/api/v1/projects</code>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Tasks</h2>
            <p className="mb-4 text-sm text-muted-foreground">Gestión de tareas</p>
            <code className="block rounded bg-muted p-2 text-xs">/api/v1/tasks</code>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">People</h2>
            <p className="mb-4 text-sm text-muted-foreground">Gestión de personas</p>
            <code className="block rounded bg-muted p-2 text-xs">/api/v1/people</code>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Documentación</h2>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Colección de Postman</h3>
              <p className="mb-2 text-sm text-muted-foreground">Importa la colección para probar todos los endpoints</p>
              <Link
                href="/postman-collection.json"
                download
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Descargar Colección
              </Link>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Documentación Completa</h3>
              <p className="mb-2 text-sm text-muted-foreground">Especificación detallada de todos los endpoints</p>
              <Link
                href="/API-DOCUMENTATION.md"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
              >
                Ver Documentación
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-2 font-medium">Endpoints Rápidos</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                GET
              </span>
              <code>/api/v1/projects</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                POST
              </span>
              <code>/api/v1/tasks</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                PUT
              </span>
              <code>/api/v1/people/:id</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-red-500/10 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                DELETE
              </span>
              <code>/api/v1/projects/:id</code>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
