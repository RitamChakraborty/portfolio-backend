import "https://deno.land/std@0.177.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const PORT = +(Deno.env.get("PORT") ?? "8080");
const app = new Application();
const router = new Router();

app.use(router.routes());

console.log(`Application is running on https://localhost:${PORT}`);
await app.listen({ port: PORT });
