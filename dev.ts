/**
 * Run me with: deno run -A --watch --unstable dev.ts
 */
///<reference lib="deno.unstable" />

import {
  cyan,
  gray,
  red,
  yellow,
} from "https://deno.land/std@0.116.0/fmt/colors.ts";

import {
  fromFileUrl,
  relative,
} from "https://deno.land/std@0.116.0/path/mod.ts";

import("./backend/mod.ts");

for await (const _e of Deno.watchFs("src/app.ts", { recursive: true })) {
  const result = await Deno.emit("src/app.ts", {
    bundle: "module",
    compilerOptions: {
      "skipLibCheck": true,
      "lib": ["ES2021", "DOM"],
    },
  });
  if (result.diagnostics.length > 0) {
    for (const diagnostic of result.diagnostics) {
      console.error(
        `${
          cyan(relative(".", fromFileUrl(diagnostic.fileName ?? "src/app.ts")))
        }:${yellow(String(diagnostic.start?.line))}:${
          yellow(String(diagnostic.start?.character))
        } - ${red("error")} ${
          gray("TS" + diagnostic.code + ":")
        }: ${diagnostic.messageText}`,
      );
    }
    continue;
  }
  await Deno.writeTextFile(
    "public/js/bundle.js",
    result.files["deno:///bundle.js"],
  );
}
