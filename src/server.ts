import * as express from "express";
import {v4 as uuidv4} from "uuid"

const app = express.default(); // Use express.default()

interface User {
  id: string;
  username: string;
}

app.use(express.json());

const usersBase: User[] = [];

// Criar usuário
app.post('/users', (req: express.Request, res: express.Response) => {
  const { username } = req.body;
  const id = uuidv4();

  const userAlreadyExists = usersBase.some((user) => user.username === username); //método some verifica se nesse array existe algum username que com esse username

  if (userAlreadyExists){
    return res.status(400).json({error: "User already exists"});
  }

  usersBase.push({
    id,
    username,
  });

  return res.status(201).json(usersBase);
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Servidor está rodando!");
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
