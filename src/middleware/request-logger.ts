import { RestUtil } from '../util/rest-util.ts'
import * as log from 'https://deno.land/std@0.104.0/log/mod.ts'

export async function requestLogger(
	// deno-lint-ignore no-explicit-any
	context: Record<string, any>,
	next: () => Promise<unknown>,
) {
	await next()
	const serverLog = await RestUtil.createServerLog(context)
	log.getLogger().info('{}', serverLog)
}
