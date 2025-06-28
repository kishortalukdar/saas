
import { Router } from "express";
import { createProduct,productList } from "../../controllers/testing/product.controller";

const router = Router();

router.route("/create").post(createProduct);
router.route("/list").get(productList);

export default router;
