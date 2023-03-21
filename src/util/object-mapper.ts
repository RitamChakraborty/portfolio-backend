import { EmailRequest, SendEmailRequest } from '../types.ts'

export default class ObjectMapper {
	static mapEmailRequestToSendEmailRequest(
		emailRequest: EmailRequest,
		receiverEmail: string,
	): SendEmailRequest {
		return {
			senderName: emailRequest.name,
			senderEmail: emailRequest.email,
			subject: emailRequest.subject,
			content: emailRequest.content,
			receiverEmail: receiverEmail,
		}
	}
}
