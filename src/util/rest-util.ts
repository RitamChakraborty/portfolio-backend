import {RouteParams, RouterContext} from "https://deno.land/x/oak@v11.1.0/router.ts";
import {ResponseEntity} from "../types.ts";

export class RestUtil {
    /**
     * Extract the request body from {@link RouterContext} as json format
     *
     * @param context - {@link RouterContext} the router context
     */
    static async getRequestBody<T>(context: RouterContext<string, RouteParams<string>>): Promise<T> {
        const requestBody = context.request.body({
            type: "json",
        });
        return await requestBody.value as T;
    }

    /**
     * Create http response based on the data sent by {@link ResponseEntity}
     *
     * @param context - {@link RouterContext} the router context
     * @param responseEntity - {@link ResponseEntity} the response entity object that contains status and data
     */
    static createResponseEntity(
        // deno-lint-ignore no-explicit-any
        context: RouterContext<string, RouteParams<string>> | Record<string, any>,
        responseEntity: ResponseEntity
    ): void {
        context.response.type = "json";
        context.response.body = responseEntity;
        context.response.status = responseEntity.status;
    }
}