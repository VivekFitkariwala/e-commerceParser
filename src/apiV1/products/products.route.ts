import { Router } from "express";
import Controller from "./products.controller";

const product: Router = Router();
const controller = new Controller();

// Get all products
product.get("/", controller.getAll);

product.post("/", controller.parse);

product.delete("/", controller.deleteAll);

export default product;
