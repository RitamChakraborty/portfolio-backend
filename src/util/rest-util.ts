import {
	RouteParams,
	RouterContext,
} from 'https://deno.land/x/oak@v11.1.0/router.ts'
import { ResponseEntity, ServerLog } from '../types.ts'

export class RestUtil {
	/**
	 * Extract the request body from {@link RouterContext} as json format
	 *
	 * @param context - {@link RouterContext} the router context
	 */
	static async getRequestBody<T>(
		context: RouterContext<string, RouteParams<string>>,
	): Promise<T> {
		const requestBody = context.request.body({
			type: 'json',
		})
		return await requestBody.value as T
	}

	/**
	 * Create http response based on the data sent by {@link ResponseEntity}
	 *
	 * @param context - {@link RouterContext} the router context
	 * @param responseEntity - {@link ResponseEntity} the response entity object that contains status and data
	 */
	static createResponseEntity(
		context:
			| RouterContext<string, RouteParams<string>>
			// deno-lint-ignore no-explicit-any
			| Record<string, any>,
		responseEntity: ResponseEntity,
	): void {
		context.response.type = 'json'
		context.response.body = responseEntity
		context.response.status = responseEntity.status
	}

	/**
	 * Creates a {@link ServerLog} object for logging
	 *
	 * @param context - The context object containing request and response objects.
	 * @returns - A promise of server log object containing origin, path, status, requestBody, and timestamp.
	 */
	// deno-lint-ignore no-explicit-any
	static async createServerLog(
		context: Record<string, any>,
	): Promise<ServerLog> {
		const origin: string = context.request.headers.get('origin')
		const status: number = context.response.status
		const path: string = context.router.url()
		const requestBody: string = await context.request.body().value
		return {
			origin: origin,
			path: path,
			status: status,
			requestBody: requestBody,
			timestamp: new Date().getTime(),
		}
	}
}
