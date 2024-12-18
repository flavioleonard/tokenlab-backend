import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import {checkEventConflict} from "../middlewares/checkEventConflictDate";
import { Event } from "../@types/Event";
import { findEventById } from "../middlewares/findEventById";
import { DateTime } from "luxon";

const eventRouter = express.Router(); //
eventRouter.use(express.json());

const eventsBase: Event[] = [];

// Criar evento
eventRouter.post(
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
eventRouter.get("/events", (req: express.Request, res: express.Response) => {
  return res.status(200).json(eventsBase);
})


//Buscando eventos por ID 
eventRouter.get("/events/:eventId", findEventById(eventsBase), (req: express.Request, res: express.Response) => {
  const event = req.body.event;
  return res.status(200).json(event);
})

//Atualizando evento
eventRouter.patch('/events/:eventId', findEventById(eventsBase), (req: express.Request, res: express.Response) => {
  const event = req.body.event
  const { description, title, startTime, endTime } = req.body;
  if (description !== undefined) event.description = description;
  if (title !== undefined) event.title = title;
  if (startTime !== undefined) event.startTime = DateTime.fromISO(startTime);
  if (endTime !== undefined) event.endTime = DateTime.fromISO(endTime);

  return res.status(200).json(event);
})

eventRouter.delete('/events/:eventId', findEventById(eventsBase), (req: express.Request, res: express.Response) => {
    const event = req.body.event;

    const index = eventsBase.indexOf(event);

    if (index === -1) {
      return res.status(404).json({ error: "Event not found" });
    }
    eventsBase.splice(index, 1);
    return res.status(204).send();

})

export default eventRouter;