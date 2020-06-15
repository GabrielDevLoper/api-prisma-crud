import express from "express";

const routes = express.Router();

import UserController from "./controllers/UserController";
import ClientController from "./controllers/ClientController";
import AddressController from "./controllers/AddressController";
import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";

// Rotas para clientes
routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.create);
routes.delete("/clients/:id", ClientController.delete);
routes.put("/clients/:id", ClientController.update);

// Rotas para endereços
routes.post("/address/:id", AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.get("/address", AddressController.index);

// Rotas para produtos
routes.post("/products", ProductController.create);

// Rotas para categorias
routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.index);

// Rotas para usuários
routes.get("/users", UserController.index);
routes.post("/users", UserController.create);

export default routes;
