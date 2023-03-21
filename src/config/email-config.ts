import { Util } from '../util/util.ts'
import { Env } from '../data/constant.ts'

type EmailConfigType = {
	allowEmail: boolean
	masterEmail: string
}

export default function emailConfig(): EmailConfigType {
	return {
		allowEmail: false,
		masterEmail: Util.getEnv(Env.MASTER_EMAIL),
	}
}
