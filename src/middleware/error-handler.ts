import { isHttpError, Status } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import { RestUtil } from '../util/rest-util.ts'
import { ResponseEntity } from '../types.ts'
import { error } from 'https://deno.land/std@0.177.0/log/mod.ts'

export async function errorHandler(
	// deno-lint-ignore no-explicit-any
	context: Record<string, any>,
	next: () => Promise<unknown>,
) {
	try {
		await next()
	} catch (err) {
		let status = err.status
		let message

		if (isHttpError(err)) {
			error(`Error occurred with http status: ${err.status}`)

			switch (err.status) {
				case Status.BadRequest:
					message = 'Bad request'
					break
				default:
					message = 'Something went wrong'
			}
		} else {
			error(`Runtime error: ${err}`)
			status = Status.InternalServerError
			message = 'Internal server error'
		}

		const responseEntity: ResponseEntity = {
			status: status,
			data: {
				message: message,
			},
		}
		RestUtil.createResponseEntity(context, responseEntity)
	}
}
