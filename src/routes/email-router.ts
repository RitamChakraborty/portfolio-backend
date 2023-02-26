import {RouteParams, Router, RouterContext} from "https://deno.land/x/oak@v11.1.0/router.ts";
import {EmailRequest, ResponseEntity} from "../types.ts";
import {sendMail} from "../service/mail-service.ts";
import {Status} from "https://deno.land/std@0.152.0/http/http_status.ts";

const emailRouter: Router = new Router();

emailRouter
    .post("/sendMail", async (context: RouterContext<"/sendMail", RouteParams<string>>) => {
            const requestBody = context.request.body();
            const emailRequest: EmailRequest = await requestBody.value as EmailRequest;
            const sendStatus: boolean = await sendMail(emailRequest)
            const status: Status = sendStatus ? Status.OK : Status.InternalServerError;
            const message: string = sendStatus ? "Mail sent successfully" : "Failed to send email";
            context.response.body = {
                status: status,
                data: {
                    message: message
                }
            } as ResponseEntity;
            context.response.status = Status.OK;
        }
    );

export default emailRouter;