import {RouteParams, RouterContext} from "https://deno.land/x/oak@v11.1.0/router.ts";
import {Status} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {EmailRequest, ResponseEntity} from "../types.ts";
import {sendMail} from "../service/mail-service.ts";

export async function sendMailController(context: RouterContext<"/api/sendMail", RouteParams<string>>) {
    const requestBody = context.request.body();
    const emailRequest: EmailRequest = await requestBody.value as EmailRequest;
    sendMail(emailRequest)
        .then((result) => {
            console.info('Email send status:', result);
        });
    context.response.body = {
        status: Status.OK,
        data: {
            message: "Email sent successfully"
        }
    } as ResponseEntity;
    context.response.status = Status.OK;
}