import { EmailRequest, SendEmailRequest } from '../types.ts'
import { EmailType, EndPoint, Env } from '../data/constant.ts'
import emailConfig from '../config/email-config.ts'
import sendgridConfig from '../config/sendgrid-config.ts'
import ObjectMapper from '../util/object-mapper.ts'
import { Util } from '../util/util.ts'
import { HttpError } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import * as log from 'https://deno.land/std@0.104.0/log/mod.ts'

/**
 * Generates request body to be sent to *Sendgrid* for sending mail
 *
 * @param sendEmailRequest - {@link SendEmailRequest} the object containing mail information
 */
function createSendgridEmailRequest(
	sendEmailRequest: SendEmailRequest,
): string {
	const senderEmail: string = sendEmailRequest.senderEmail
	const content: string =
		`${sendEmailRequest.content}<p>Sent by <a href="mailto:${senderEmail}">${senderEmail}</a></p>`
	log.getLogger().info('content %s', content)
	const sendgridEmailRequest = {
		personalizations: [
			{
				to: [
					{
						email: sendEmailRequest.receiverEmail,
					},
				],
			},
		],
		from: {
			name: sendEmailRequest.senderName,
			email: sendgridConfig().masterEmail,
		},
		subject: sendEmailRequest.subject,
		content: [
			{
				type: EmailType.TEXT_HTML,
				value: content,
			},
		],
	}

	return JSON.stringify(sendgridEmailRequest)
}

/**
 * This  method sends email with sendgrid. It takes {@link SendEmailRequest} as an input and based on the data present
 * in the object, it first creates the header then calls the {@link createSendgridEmailRequest} function to create the
 * request body to be sent to send grid
 *
 * @param sendEmailRequest - {@link SendEmailRequest} the object contains mail information
 * @throws {@link HttpError} when failed to send email through send grid
 * @function
 */
async function sendEmailBySendgrid(sendEmailRequest: SendEmailRequest) {
	if (!emailConfig().allowEmail) {
		return
	}

	const sendMailEndpoint =
		`${sendgridConfig().apiEndpoint}${EndPoint.SENDGRID_SEND_EMAIL}`
	const headers = {
		'Authorization': `Bearer ${sendgridConfig().authorizationToken}`,
		'Content-Type': 'application/json',
	}
	const sendgridEmailRequest: string = createSendgridEmailRequest(
		sendEmailRequest,
	)

	try {
		await fetch(
			sendMailEndpoint,
			{
				method: 'POST',
				headers: headers,
				body: sendgridEmailRequest,
			},
		)
	} catch (e) {
		const errMsg = 'Failed to send mail'
		throw new HttpError(errMsg)
	}
}

/**
 * Sends mail through *Sendgrid*
 *
 * Get the sendgrid api endpoint, sendgrid authorized email address, receiver email address, sendgrid authorization
 * token from the environment variable. If any of the environment variable is missing, it'll throw an error. It creates
 * the header with the content type and the authorization as bearer token. And send a mail request to sendgrid.
 * Depending on if the email is sent or not a boolean value is returned.
 *
 * @param emailRequest {EmailRequest} - sender information
 * @function
 */
export async function sendMail(emailRequest: EmailRequest) {
	const receiverEmail: string = Util.getEnv(Env.RECEIVER_EMAIL)
	const sendEmailRequest: SendEmailRequest = ObjectMapper
		.mapEmailRequestToSendEmailRequest(
			emailRequest,
			receiverEmail,
		)
	await sendEmailBySendgrid(sendEmailRequest)
}
