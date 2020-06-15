import express from "express";

const routes = express.Router();

import UserController from "./controllers/UserController";
const User = new UserController();

import ClientController from "./controllers/ClientController";
const Client = new ClientController();

import AddressController from "./controllers/AddressController";

routes.get("/clients", Client.index);
routes.post("/clients", Client.create);
routes.delete("/clients/:id", Client.delete);

routes.post("/address/:id", AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.get("/address", AddressController.index);

routes.get("/users", User.index);
routes.post("/users", User.create);

export default routes;
