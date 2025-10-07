import express from "express";
import usersController from "../controllers/users.js";

const usersControllerInstance =  usersController;
const routesUsers = express.Router();

routesUsers.get("/", (req, res) => {
  // Aquí retornarías la lista de usuarios desde la base de datos
  usersControllerInstance.getUsers(req, res);
});

routesUsers.post("/", (req, res) => {
  // Aquí crearías un nuevo usuario en la base de datos
  usersControllerInstance.createUser(req, res);
});

routesUsers.get("/:id", (req, res) => {
  // Aquí retornarías un usuario específico por su ID desde la base de datos
  usersControllerInstance.getUserById(req, res);
});

routesUsers.put("/", (req, res) => {
  // Aquí actualizarías un usuario existente en la base de datos
  usersControllerInstance.updateUser(req, res);
});

routesUsers.delete("/:id", (req, res) => {
  // Aquí eliminarías un usuario específico por su ID desde la base de datos
  usersControllerInstance.deleteUser(req, res);
});

export default routesUsers;