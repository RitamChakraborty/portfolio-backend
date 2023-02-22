import "https://deno.land/std@0.177.0/dotenv/load.ts";
import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./src/routes.ts";

const PORT = +(Deno.env.get("PORT") ?? "8080");
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({hostname, port, secure}) => {
    console.log(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

await app.listen({port: PORT});
