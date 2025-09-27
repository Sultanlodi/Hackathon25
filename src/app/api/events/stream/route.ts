

import { NextResponse } from "next/server";

// Keep track of connected clients
let clients: WritableStreamDefaultWriter<Uint8Array>[] = [];

// Utility: send heartbeat pings so the connection stays open
function sendHeartbeat(writer: WritableStreamDefaultWriter<Uint8Array>) {
  const encoder = new TextEncoder();
  const interval = setInterval(() => {
    writer.write(encoder.encode("data: ping\n\n"));
  }, 15000); // every 15s
  return interval;
}

// Handle GET request: open an SSE stream
export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Add client
  clients.push(writer);

  // Start heartbeat
  const heartbeat = sendHeartbeat(writer);

  // When closed, clean up
  const close = () => {
    clearInterval(heartbeat);
    clients = clients.filter((c) => c !== writer);
    writer.close();
  };

  // Make sure to close on errors or disconnect
  stream.readable.pipeTo(new WritableStream(), { preventClose: true }).catch(close);

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

// 🔥 Utility: broadcast an event to all clients
export function sendEvent(event: any) {
  const encoder = new TextEncoder();
  const msg = `data: ${JSON.stringify(event)}\n\n`;

  clients.forEach(async (client) => {
    try {
      await client.write(encoder.encode(msg));
    } catch {
      // remove any dead clients
      clients = clients.filter((c) => c !== client);
    }
  });
}
