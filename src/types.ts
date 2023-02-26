import {Status} from "https://deno.land/std@0.152.0/http/http_status.ts";

export interface ResponseEntity {
    status: Status;
    data?: unknown;
}

export interface EmailRequest {
    email: string;
    name: string;
    subject: string;
    content: string;
}