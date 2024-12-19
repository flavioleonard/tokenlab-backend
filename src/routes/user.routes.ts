import * as express from "express";
import { checkUserAlreadyExists } from "../middlewares/checkUsersExists";
import { findUserById } from "../middlewares/findUserById";
import { createUser, listUsers, getUser, changeUser, deleteUser, createEventForUser } from "../controllers/userController";
import { checkEventConflict } from "../middlewares/checkEventConflictDate";
import  usersBase  from "../data/usersBase";
import eventsBase from "../data/eventsBase";

const userRouter = express.Router();
userRouter.use(express.json());

// Criar usuário
userRouter.post('/users', checkUserAlreadyExists(usersBase), createUser);

///criar evento para um usuario especifico 
userRouter.post(
    "/users/:userId/events",
    findUserById(usersBase),
    checkEventConflict(eventsBase), // Conflito deve verificar eventos do usuário
    createEventForUser
  );

// Listando usuários
userRouter.get("/users", listUsers);

// Buscando usuário por ID
userRouter.get("/users/:userId", findUserById(usersBase), getUser);

// Atualizando usuário
userRouter.patch('/users/:userId', findUserById(usersBase), changeUser);

// Deletar usuário
userRouter.delete('/users/:userId', findUserById(usersBase), deleteUser);

export default userRouter;