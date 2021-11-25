import { readableStreamFromReader } from "https://deno.land/std@0.116.0/streams/conversion.ts";

const publicDir = new URL("../public/", import.meta.url);

async function serve(conn: Deno.Conn) {
  try {
    for await (const req of Deno.serveHttp(conn)) {
      const path = "." + new URL(req.request.url).pathname;

      const file = new URL(
        path.endsWith("/") ? path + "index.html" : path,
        publicDir,
      );
      if ((await Deno.stat(file)).isFile) {
        req.respondWith(
          new Response(
            readableStreamFromReader(
              await Deno.open(file),
            ),
          ),
        );
        continue;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

const port = 8080;
console.log(`Listening on http://127.0.0.1:${port}`);

for await (const conn of Deno.listen({ port })) {
  serve(conn);
}
