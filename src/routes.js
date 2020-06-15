import express from "express";

const routes = express.Router();

import UserController from "./controllers/UserController";

import ClientController from "./controllers/ClientController";

import AddressController from "./controllers/AddressController";
import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";

routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.create);
routes.delete("/clients/:id", ClientController.delete);
routes.put("/clients/:id", ClientController.update);

routes.post("/address/:id", AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.get("/address", AddressController.index);

routes.post("/products", ProductController.create);

routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.index);

routes.get("/users", UserController.index);
routes.post("/users", UserController.create);

export default routes;
