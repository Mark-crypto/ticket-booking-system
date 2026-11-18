import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
      <p className="font-heading text-6xl font-bold">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        This page doesn't exist yet, or it may have moved.
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </section>
  )
}
