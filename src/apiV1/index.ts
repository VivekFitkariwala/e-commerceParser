import { Router } from "express";
import products from "./products/products.route";

const router: Router = Router();

router.use("/products", products);

export default router;
