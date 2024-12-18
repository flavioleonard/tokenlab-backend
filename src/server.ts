import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { checkUserAlreadyExists } from "./middlewares/checkUsersExists";
import {checkEventConflict} from "./middlewares/checkEventConflictDate";
import { User } from "./@types/User";
import { Event } from "./@types/Event";
import { findUserById } from "./middlewares/findUserById";
import { findEventById } from "./middlewares/findEventById";
import { DateTime } from "luxon";

const app = express.default(); // Use express.default()

app.use(express.json());

const usersBase: User[] = [];
const eventsBase: Event[] = [];

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

// Criar evento
app.post(
  '/events',
  checkEventConflict(eventsBase), // Middleware de validação
  (req: express.Request, res: express.Response) => {
    const { description, title, startTime, endTime } = req.body;

    const id = uuidv4();
    eventsBase.push({
      id,
      title,
      description,
      startTime: DateTime.fromISO(startTime),
      endTime: DateTime.fromISO(endTime)
    });

    return res.status(201).json(eventsBase);
  }
);

//Listando Eventos 
app.get("/events", (req: express.Request, res: express.Response) => {
  return res.status(200).json(eventsBase);
})

// Listando usuários
app.get("/users",  (req: express.Request, res: express.Response) => {
  return res.status(200).json(usersBase);
});

// Buscando usuário por ID
app.get("/users/:userId", findUserById(usersBase), (req: express.Request, res: express.Response) => {
    const user = req.body.user;
    return res.status(200).json(user);
});

//Buscando eventos por ID 
app.get("/events/:eventId", findEventById(eventsBase), (req: express.Request, res: express.Response) => {
  const event = req.body.event;
  return res.status(200).json(event);
})

// Atualizando usuário
app.patch('/users/:userId', findUserById(usersBase), (req: express.Request, res: express.Response) => {
  const user = req.body.user;
  const { username } = req.body;
  user.username = username;

  return res.status(200).json(user);
});

// Deletar usuário
app.delete('/users/:userId', findUserById(usersBase), (req: express.Request, res: express.Response) => {
  const user = req.body.user;

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
