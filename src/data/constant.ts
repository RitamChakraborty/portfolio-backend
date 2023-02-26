export enum Env {
    SENDGRID_API = "SENDGRID_API",
    MASTER_EMAIL = "MASTER_EMAIL",
    RECEIVER_EMAIL = "RECEIVER_EMAIL",
    SENDGRID_AUTH_TOKEN = "SENDGRID_AUTH_TOKEN"
}

export enum EmailType {
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html"
}

export enum EndPoint {
    SENDGRID_SEND_EMAIL = "/mail/send"
}