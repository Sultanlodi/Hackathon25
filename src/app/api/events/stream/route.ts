import { NextResponse } from 'next/server'
import { addClient, removeClient, sendHeartbeat } from '@/lib/events'

// Configure route to be dynamic
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Handle GET request: open an SSE stream
export async function GET() {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // Add client
  addClient(writer)

  // Start heartbeat
  const heartbeat = sendHeartbeat(writer)

  // When closed, clean up
  const close = () => {
    clearInterval(heartbeat)
    removeClient(writer)
    writer.close()
  }

  // Make sure to close on errors or disconnect
  stream.readable
    .pipeTo(new WritableStream(), { preventClose: true })
    .catch(close)

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
