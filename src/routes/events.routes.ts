import * as express from "express";
import {checkEventConflict} from "../middlewares/checkEventConflictDate";
import { findEventById } from "../middlewares/findEventById";
import eventsBase from "../data/eventsBase";
import { changeEvent, createEvent, deleteEvent, getEvent, listEvents } from "../controllers/eventsController";

const eventRouter = express.Router(); //
eventRouter.use(express.json());


// Criar evento
eventRouter.post('/events', checkEventConflict(eventsBase), createEvent);

//Listando Eventos 
eventRouter.get("/events", listEvents);

//Buscando eventos por ID 
eventRouter.get("/events/:eventId", findEventById(eventsBase), getEvent)

//Atualizando evento
eventRouter.patch('/events/:eventId', findEventById(eventsBase), changeEvent)

//Deletando evento 
eventRouter.delete('/events/:eventId', findEventById(eventsBase), deleteEvent)

export default eventRouter;