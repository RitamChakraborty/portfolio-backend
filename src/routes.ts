import {Router} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {sendMail} from "./controllers/mail.ts";

const router = new Router();
router
    .get("/api/sendMail", sendMail);

export default router;
