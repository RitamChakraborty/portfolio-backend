import "https://deno.land/std@0.177.0/dotenv/load.ts";

const PORT = Deno.env.get("PORT") ?? "8080";
