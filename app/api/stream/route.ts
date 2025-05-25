import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sampleListings = [
        {
          id: "1",
          title: "Sunny Studio in Newtown",
          price: "$280/w",
          suburb: "Newtown",
        },
        {
          id: "2",
          title: "2BR share near UNSW",
          price: "$220/w",
          suburb: "Kensington",
        },
        {
          id: "3",
          title: "CBD High-Rise Room",
          price: "$350/w",
          suburb: "Sydney CBD",
        },
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i >= sampleListings.length) return;
        const data = `data: ${JSON.stringify(sampleListings[i++])}\n\n`;
        controller.enqueue(encoder.encode(data));
      }, 2000);

      req.signal.addEventListener("abort", () => clearInterval(interval));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
