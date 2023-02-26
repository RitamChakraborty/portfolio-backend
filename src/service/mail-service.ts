import {EmailRequest} from "../types.ts";
import {Util} from "../util/util.ts";
import {EmailType, EndPoint, Env} from "../data/constant.ts";
import {error, info} from "https://deno.land/std@0.177.0/log/mod.ts";

/**
 * Generates request body to be sent to *Sendgrid* for sending mail
 *
 * @param masterEmail {string} - sendgrid authorized email
 * @param receiverEmail {string} - email of the receiver
 * @param emailRequest {EmailRequest} - sender information
 * @return {string} - string value of the request body
 * @function
 */
function createSendgridEmailRequest(masterEmail: string, receiverEmail: string, emailRequest: EmailRequest): string {
    const sendgridEmailRequest = {
        personalizations: [
            {
                to: [
                    {
                        email: receiverEmail
                    }
                ]
            }
        ],
        from: {
            name: emailRequest.name,
            email: masterEmail
        },
        subject: emailRequest.subject,
        content: [
            {
                type: EmailType.TEXT_HTML,
                value: emailRequest.content
            }
        ]
    }

    return JSON.stringify(sendgridEmailRequest);
}

/**
 * Sends mail through *Sendgrid*
 *
 * Get the sendgrid api endpoint, sendgrid authorized email address, receiver email address, sendgrid authorization
 * token from the environment variable. If any of the environment variable is missing, it'll throw an error. It creates
 * the header with the content type and the authorization as bearer token. And send a send mail request to sendgrid.
 * Depending on if the email is sent or not a boolean value is returned.
 *
 * @param emailRequest {EmailRequest} - sender information
 * @return {boolean} - `true` if mail is successfully sent, `false` otherwise
 * @function
 */
export async function sendMail(emailRequest: EmailRequest): Promise<boolean> {
    const sendgridApi: string = Util.getEnv(Env.SENDGRID_API);
    const sendMailEndpoint = `${sendgridApi}${EndPoint.SENDGRID_SEND_EMAIL}`;
    const masterEmail: string = Util.getEnv(Env.MASTER_EMAIL);
    const receiverEmail: string = Util.getEnv(Env.RECEIVER_EMAIL);
    const authorizationToken: string = Util.getEnv(Env.SENDGRID_AUTH_TOKEN);
    const headers = {
        "Authorization": `Bearer ${authorizationToken}`,
        "Content-Type": "application/json"
    };
    const sendgridEmailRequest: string = createSendgridEmailRequest(masterEmail, receiverEmail, emailRequest);
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
