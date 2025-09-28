// Keep track of connected clients
let clients: WritableStreamDefaultWriter<Uint8Array>[] = []

// Add client to the list
export function addClient(client: WritableStreamDefaultWriter<Uint8Array>) {
  clients.push(client)
}

// Remove client from the list
export function removeClient(client: WritableStreamDefaultWriter<Uint8Array>) {
  clients = clients.filter((c) => c !== client)
}

// Utility: broadcast an event to all clients
export function sendEvent(event: any) {
  const encoder = new TextEncoder()
  const msg = `data: ${JSON.stringify(event)}\n\n`

  clients.forEach(async (client) => {
    try {
      await client.write(encoder.encode(msg))
    } catch {
      // remove any dead clients
      clients = clients.filter((c) => c !== client)
    }
  })
}

// Utility: send heartbeat pings so the connection stays open
export function sendHeartbeat(writer: WritableStreamDefaultWriter<Uint8Array>) {
  const encoder = new TextEncoder()
  const interval = setInterval(() => {
    writer.write(encoder.encode('data: ping\n\n'))
  }, 15000) // every 15s
  return interval
}
