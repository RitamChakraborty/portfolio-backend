import "https://deno.land/std@0.177.0/dotenv/load.ts";
import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./src/routes.ts";

const PORT = +(Deno.env.get("PORT") ?? "8080");
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Application is running on https://localhost:${PORT}`);
await app.listen({port: PORT});
