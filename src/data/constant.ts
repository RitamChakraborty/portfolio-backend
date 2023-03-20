export enum Env {
    SENDGRID_API = "SENDGRID_API",
    MASTER_EMAIL = "MASTER_EMAIL",
    RECEIVER_EMAIL = "RECEIVER_EMAIL",
    SENDGRID_AUTH_TOKEN = "SENDGRID_AUTH_TOKEN",
    WINDOW_FRAME_IN_MS = "WINDOW_FRAME_IN_MS",
    MAX_REQUESTS_ALLOWED = "MAX_REQUESTS_ALLOWED"
}

export enum EmailType {
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html"
}

export enum EndPoint {
    SENDGRID_SEND_EMAIL = "/mail/send"
}

export enum HttpHeader {
    CONTENT_TYPE = "Content-Type",
    ACCEPT = "Accept",
    AUTHORIZATION = "Authorization"
}

export enum MediaType {
    APPLICATION_JSON_VALUE = "application/json"
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST"
}