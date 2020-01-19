import { Router } from "express";
import Controller from "./products.controller";

const product: Router = Router();
const controller = new Controller();

// Get all products

// Retrieve all Users
// user.get("/", controller.findAll);

// Retrieve a Specific User
// user.get("/:id", controller.findOne);

// Update a User with Id
// user.put("/:id", controller.update);

// Delete a User with Id
// user.delete("/:id", controller.remove);

product.post("/", controller.parse);

export default product;
