import {log} from "https://deno.land/x/mysql@v2.11.0/mod.ts";
import {RestUtil} from "../util/rest-util.ts";

export async function requestLogger(
    // deno-lint-ignore no-explicit-any
    context: Record<string, any>,
    next: () => Promise<unknown>,
) {
    await next();
    const serverLog = await RestUtil.createServerLog(context);
    log.getLogger().info('{}', serverLog);
}
