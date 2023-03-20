import {EmailRequest, SendEmailRequest} from "../types.ts";
import {EmailType, EndPoint, Env} from "../data/constant.ts";
import {error, info} from "https://deno.land/std@0.177.0/log/mod.ts";
import emailConfig from "../config/email-config.ts";
import sendgridConfig from "../config/sendgrid-config.ts";
import ObjectMapper from "../util/object-mapper.ts";
import {Util} from "../util/util.ts";

/**
 * Generates request body to be sent to *Sendgrid* for sending mail
 *
 * @param sendEmailRequest - {@link SendEmailRequest} the object containing mail information
 */
function createSendgridEmailRequest(sendEmailRequest: SendEmailRequest): string {
    const sendgridEmailRequest = {
        personalizations: [
            {
                to: [
                    {
                        email: sendEmailRequest.receiverEmail
                    }
                ]
            }
        ],
        from: {
            name: sendEmailRequest.senderName,
            email: sendgridConfig().masterEmail
        },
        subject: sendEmailRequest.subject,
        content: [
            {
                type: EmailType.TEXT_HTML,
                value: sendEmailRequest.content
            }
        ]
    }

    return JSON.stringify(sendgridEmailRequest);
}

/**
 * This  method sends email with sendgrid. It takes {@link SendEmailRequest} as an input and based on the data present
 * in the object, it first creates the header then calls the {@link createSendgridEmailRequest} function to create the
 * request body to be sent to send grid
 *
 * @param sendEmailRequest - {@link SendEmailRequest} the object contains mail information
 */
async function sendEmailBySendgrid(sendEmailRequest: SendEmailRequest): Promise<boolean> {
    if (!emailConfig().allowEmail) {
        return true;
    }

    const sendMailEndpoint = `${sendgridConfig().apiEndpoint}${EndPoint.SENDGRID_SEND_EMAIL}`;
    const headers = {
        "Authorization": `Bearer ${sendgridConfig().authorizationToken}`,
        "Content-Type": "application/json"
    };
    const sendgridEmailRequest: string = createSendgridEmailRequest(sendEmailRequest);
    info(`Sendgrid Email Request: ${sendgridEmailRequest}`);

    try {
        await fetch(
            sendMailEndpoint,
            {
                method: 'POST',
                headers: headers,
                body: sendgridEmailRequest
            }
        );
    } catch (e) {
        error(`Failed to send email ${e}`);
        return false;
    }

    return true;
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
 * @return {boolean} - `true` if mail is successfully sent, `false` otherwise
 * @function
 */
export function sendMail(emailRequest: EmailRequest): Promise<boolean> {
    const receiverEmail: string = Util.getEnv(Env.RECEIVER_EMAIL);
    const sendEmailRequest: SendEmailRequest = ObjectMapper.mapEmailRequestToSendEmailRequest(
        emailRequest, receiverEmail);
    return sendEmailBySendgrid(sendEmailRequest);
}
