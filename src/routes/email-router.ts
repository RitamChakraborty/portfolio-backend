import {RouteParams, Router, RouterContext} from "https://deno.land/x/oak@v11.1.0/router.ts";
import {EmailRequest, ResponseEntity} from "../types.ts";
import {sendMail} from "../service/mail-service.ts";
import {Status} from "https://deno.land/std@0.152.0/http/http_status.ts";
import {RestUtil} from "../util/rest-util.ts";

const emailRouter: Router = new Router();

emailRouter
    .post("/sendMail", async (context: RouterContext<string, RouteParams<string>>) => {
            const emailRequest: EmailRequest = await RestUtil.getRequestBody<EmailRequest>(context);
            const sendStatus: boolean = await sendMail(emailRequest)
            const responseBody: ResponseEntity = {
                status: Status.OK,
                data: {
                    message: "Mail sent successfully"
                }
            }
            RestUtil.createResponseEntity(context, responseBody);
        }
    );

export default emailRouter;