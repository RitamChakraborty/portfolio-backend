import {CorsOptions} from "https://deno.land/x/cors@v1.2.2/types.ts";
import {HttpMethod} from "../data/constant.ts";

export default function corsConfig(): CorsOptions {
    return {
        origin: [
            "http://localhost:5173"
        ],
        methods: [
            HttpMethod.POST
        ]
    };
}