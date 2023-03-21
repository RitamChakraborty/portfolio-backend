import { MapStore } from 'https://deno.land/x/oak_rate_limit@v0.1.1/mod.ts'
import { Util } from '../util/util.ts'
import { Env } from '../data/constant.ts'
import { RatelimitOptions } from 'https://deno.land/x/oak_rate_limit@v0.1.1/src/types/types.d.ts'

export default function rateLimiterConfig(): Partial<RatelimitOptions> {
	return {
		store: new MapStore(),
		windowMs: +Util.getEnv(Env.WINDOW_FRAME_IN_MS),
		max: +Util.getEnv(Env.MAX_REQUESTS_ALLOWED),
		headers: true,
		message: 'Too many requests, please try again later',
		statusCode: 429,
	}
}
