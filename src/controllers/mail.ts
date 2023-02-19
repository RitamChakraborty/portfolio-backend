import {RouteParams, RouterContext} from "https://deno.land/x/oak@v11.1.0/router.ts";

export function sendMail(context: RouterContext<"/api/sendMail", RouteParams<string>>) {
    context.response.body = {
        statusCode: 200,
        status: "Success",
        data: {
            message: "Mail send successfully",
        },
    };
}