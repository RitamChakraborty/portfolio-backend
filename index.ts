import "https://deno.land/std@0.177.0/dotenv/load.ts";
import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {oakCors} from "https://deno.land/x/cors@v1.2.2/mod.ts";
import emailRouter from "./src/routes/email-router.ts";
import {info} from "https://deno.land/std@0.177.0/log/mod.ts";
import rateLimiterConfig from "./src/config/rate-limiter-config.ts";
import {errorHandler} from "./src/middleware/error-handler.ts";
import corsConfig from "./src/config/cors-config.ts";
import {RateLimiter} from "https://deno.land/x/oak_rate_limit@v0.1.1/mod.ts";

const PORT = +(Deno.env.get("PORT") ?? "8080");
const app = new Application();

app.use(oakCors(corsConfig()));
app.use(await RateLimiter(rateLimiterConfig()));
app.use(errorHandler);

app.use(emailRouter.prefix("/api").routes());

app.addEventListener("listen", ({hostname, port, secure}) => {
    info(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

await app.listen({port: PORT});
