import express from "express";
import authUsersController from "../controllers/authuser.js";
import {verifyToken} from '../helpers/jwt_generator.js';

const authUsersControllerInstance =  authUsersController;
const routesAuthUsers = express.Router();

routesAuthUsers.get("/", verifyToken ,(req, res) => {
  // Aquí retornarías la lista de usuarios desde la base de datos
  authUsersControllerInstance.getUsers(req, res);
});

routesAuthUsers.post("/", (req, res) => {
  // Aquí crearías un nuevo usuario en la base de datos
  authUsersControllerInstance.createUser(req, res);
});



routesAuthUsers.post("/login", (req, res) => {
  // Aquí manejarías el inicio de sesión del usuario
  authUsersControllerInstance.loginUser(req, res);
});

routesAuthUsers.get("/:id", (req, res) => {
  // Aquí retornarías un usuario específico por su ID desde la base de datos
  authUsersControllerInstance.getUserById(req, res);
});

routesAuthUsers.put("/", (req, res) => {
  // Aquí actualizarías un usuario existente en la base de datos
  authUsersControllerInstance.updateUser(req, res);
});

routesAuthUsers.delete("/:id", (req, res) => {
  // Aquí eliminarías un usuario específico por su ID desde la base de datos
  authUsersControllerInstance.deleteUser(req, res);
});

export default routesAuthUsers;