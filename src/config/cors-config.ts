import { CorsOptions } from 'https://deno.land/x/cors@v1.2.2/types.ts'
import { Env, HttpMethod } from '../data/constant.ts'
import { Util } from '../util/util.ts'

export default function corsConfig(): CorsOptions {
	return {
		origin: Util.getEnv(Env.ALLOWED_ORIGINS).split(','),
		methods: [
			HttpMethod.POST,
		],
	}
}
