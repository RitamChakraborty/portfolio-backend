import {SmtpClient} from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import {EmailRequest} from "../types.ts";

export async function sendMail(emailRequest: EmailRequest): Promise<boolean> {
    const client = new SmtpClient();
    const username: string = Deno.env.get("GMAIL_USERNAME")!;
    const password: string = Deno.env.get("GMAIL_PASSWORD")!;

    console.debug("Username", username);
    console.debug("Password", password);
    console.info("Email request", emailRequest);

    await client.connectTLS({
        hostname: "smtp.gmail.com",
        port: 465,
        username: username,
        password: password,
    });

    try {
        await client.send({
            from: emailRequest.email,
            to: username,
            subject: emailRequest.subject,
            content: emailRequest.content
        });
    } catch (e) {
        console.error("Failed to send email", e);
        return false;
    } finally {
        await client.close();
    }

    return true;
}
