
import { Router } from "express";
import { createOrder,getAllOrders } from "../../controllers/testing/order.controller";

const router = Router();

router.route("/create").post(createOrder);
router.route("/all-orders").get(getAllOrders);

export default router;
