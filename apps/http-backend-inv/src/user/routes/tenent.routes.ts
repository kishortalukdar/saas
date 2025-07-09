
import { Router } from "express";
import {tenentCreate} from '../controllers/tenent.controller'

const router = Router();

router.route("/create").post(tenentCreate);

export default router;
