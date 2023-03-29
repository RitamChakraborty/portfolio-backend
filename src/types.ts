import {Status} from 'https://deno.land/std@0.152.0/http/http_status.ts'

export interface ResponseEntity {
	status: Status
	data?: unknown
}

export interface EmailRequest {
	email: string
	name: string
	subject: string
	content: string
}

export interface SendEmailRequest {
	senderName: string
	senderEmail: string
	subject: string
	content: string
	receiverEmail: string
}

export interface ServerLog {
	origin: string
	path: string
	status: number
	requestBody: string
	timestamp: number
}
