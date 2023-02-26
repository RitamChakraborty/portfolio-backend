import "https://deno.land/std@0.177.0/dotenv/load.ts";
import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import emailRouter from "./src/routes/email-router.ts";
import {info} from "https://deno.land/std@0.177.0/log/mod.ts";

const PORT = +(Deno.env.get("PORT") ?? "8080");
const app = new Application();

app.use(emailRouter.prefix("/api").routes());
app.use(emailRouter.allowedMethods());

app.addEventListener("listen", ({hostname, port, secure}) => {
    info(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

await app.listen({port: PORT});
