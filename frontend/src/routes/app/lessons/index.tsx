import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/lessons/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/lessons/"!</div>
}
