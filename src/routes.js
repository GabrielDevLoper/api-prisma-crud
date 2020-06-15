import express from "express";

const routes = express.Router();

import UserController from "./controllers/UserController";
const User = new UserController();

import ClientController from "./controllers/ClientController";
const Client = new ClientController();

import AddressController from "./controllers/AddressController";
import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";

routes.get("/clients", Client.index);
routes.post("/clients", Client.create);
routes.delete("/clients/:id", Client.delete);
routes.put("/clients/:id", Client.update);

routes.post("/address/:id", AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.get("/address", AddressController.index);

routes.post("/products", ProductController.create);

routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.index);

routes.get("/users", User.index);
routes.post("/users", User.create);

export default routes;
