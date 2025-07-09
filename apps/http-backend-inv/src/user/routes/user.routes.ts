
import { Router } from "express";
import {siginIn} from '../controllers/user.controller'

const router = Router();

router.route("/sign-in").post(siginIn);

export default router;
