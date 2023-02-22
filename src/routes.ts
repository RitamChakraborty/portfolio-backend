import {Router} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {sendMailController} from "./controllers/mail.ts";

const router = new Router();
router
    .post("/api/sendMail", sendMailController);

export default router;
