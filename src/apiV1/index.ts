import { Router } from "express";
import products from "./products/products.route";
import users from "./users/user.route";

const router: Router = Router();

router.use("/users", users);
router.use("/products", products);

export default router;
