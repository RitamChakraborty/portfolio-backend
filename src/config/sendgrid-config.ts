import { Util } from '../util/util.ts'
import { Env } from '../data/constant.ts'

type SendgridConfigType = {
	apiEndpoint: string
	authorizationToken: string
	masterEmail: string
}

export default function sendgridConfig(): SendgridConfigType {
	return {
		apiEndpoint: Util.getEnv(Env.SENDGRID_API),
		authorizationToken: Util.getEnv(Env.SENDGRID_AUTH_TOKEN),
		masterEmail: Util.getEnv(Env.MASTER_EMAIL),
	}
}
