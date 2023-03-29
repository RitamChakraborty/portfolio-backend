import {ServerLog} from "../types.ts";
import {log} from "https://deno.land/x/mysql@v2.11.0/mod.ts";

export async function requestLogger(
    // deno-lint-ignore no-explicit-any
    context: Record<string, any>,
    next: () => Promise<unknown>,
) {
    await next();
    const origin: string = context.request.headers.get('origin');
    const status: number = context.response.status;
    const path: string = context.router.url();
    const requestBody: string = await context.request.body().value;
    const serverLog: ServerLog = {
        origin: origin,
        path: path,
        status: status,
        requestBody: requestBody,
        timestamp: new Date().getTime()
    }
    log.getLogger().info('Request {}', serverLog);
}
