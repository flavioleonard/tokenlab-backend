import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { checkUserAlreadyExists } from "../middlewares/checkUsersExists";
import { User } from "../@types/User";
import { findUserById } from "../middlewares/findUserById";


const userRouter = express.Router();
userRouter.use(express.json());

const usersBase: User[] = [];

// Criar usuário
userRouter.post(
  '/users',
  checkUserAlreadyExists(usersBase), 
  (req: express.Request, res: express.Response) => {
    const { username } = req.body;
    const id = uuidv4();
    usersBase.push({
      id,
      username,
    });

    return res.status(201).json(usersBase);
  }
);

// Listando usuários
userRouter.get("/users",  (req: express.Request, res: express.Response) => {
  return res.status(200).json(usersBase);
});

// Buscando usuário por ID
userRouter.get("/users/:userId", findUserById(usersBase), (req: express.Request, res: express.Response) => {
    const user = req.body.user;
    return res.status(200).json(user);
});

// Atualizando usuário
userRouter.patch('/users/:userId', findUserById(usersBase), (req: express.Request, res: express.Response) => {
  const user = req.body.user;
  const { username } = req.body;
  if( username !== undefined) user.username = username
  return res.status(200).json(user);
});


// Deletar usuário
userRouter.delete('/users/:userId', findUserById(usersBase), (req: express.Request, res: express.Response) => {
  const user = req.body.user;

  const index = usersBase.indexOf(user);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  usersBase.splice(index, 1);
  return res.status(204).send();
});

export default userRouter;