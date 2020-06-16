import express from "express";

import UserController from "./controllers/UserController";
import ClientController from "./controllers/ClientController";
import AddressController from "./controllers/AddressController";
import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";

const routes = express.Router();

// Rotas para clientes
routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.create);
routes.delete("/clients/:id", ClientController.delete);
routes.put("/clients/:id", ClientController.update);

// Rotas para endereços
routes.post("/address/:id", AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.put("/address/:id", AddressController.update);
routes.get("/address", AddressController.index);

// Rotas para produtos
routes.post("/products/:category_id", ProductController.create);
routes.get("/products", ProductController.index);
routes.delete("/products/:id", ProductController.delete);
routes.put(
  "/products/:product_id/category/:category_id",
  ProductController.update
);

// Rotas para categorias
routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.index);
routes.delete("/category/:id", CategoryController.delete);
routes.put("/category/:id", CategoryController.update);

// Rotas para usuários
routes.get("/users", UserController.index);
routes.post("/users", UserController.create);

export default routes;
