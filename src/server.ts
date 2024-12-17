import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { checkUserAlreadyExists } from "./middlewares/checkUsersExists";
import { User } from "./@types/User";

const app = express.default(); // Use express.default()

app.use(express.json());

const usersBase: User[] = [];

// Criar usuário
app.post(
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
app.get("/users",  (req: express.Request, res: express.Response) => {
  return res.status(200).json(usersBase);
});

// Buscando usuário por ID
app.get("/users/:userId", (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const user = usersBase.find((user) => user.id === userId);

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "User not found" });
  }
});

// Atualizando usuário
app.patch('/users/:userId', (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const user = usersBase.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username } = req.body;
  user.username = username;

  return res.status(200).json(user);
});

// Deletar usuário
app.delete('/users/:userId', (req: express.Request, res: express.Response) => {
  const { userId } = req.params;
  const user = usersBase.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const index = usersBase.indexOf(user);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  usersBase.splice(index, 1);
  return res.status(204).send();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Servidor rodando!");
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
