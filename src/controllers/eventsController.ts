import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import eventsBase from "../data/eventsBase";
import { DateTime } from "luxon";

export function createEvent (request: Request, response: Response): Response {
    const { description, title, startTime, endTime } = request.body;

    const id = uuidv4();
    eventsBase.push({
      id,
      title,
      description,
      startTime: DateTime.fromISO(startTime),
      endTime: DateTime.fromISO(endTime)
    });

    return response.status(201).json(eventsBase);
}

export function listEvents(request: Request, response: Response): Response {
    return response.status(200).json(eventsBase);
}

export function getEvent(request: Request, response: Response): Response {
    const event = request.body.event;
  return response.status(200).json(event);
}

export function changeEvent(request: Request, response: Response): Response {
    const event = request.body.event
  const { description, title, startTime, endTime } = request.body;
  if (description !== undefined) event.description = description;
  if (title !== undefined) event.title = title;
  if (startTime !== undefined) event.startTime = DateTime.fromISO(startTime);
  if (endTime !== undefined) event.endTime = DateTime.fromISO(endTime);

  return response.status(200).json(event);
}

export function deleteEvent(request: Request, response: Response): Response {
    const event = request.body.event;

    const index = eventsBase.indexOf(event);

    if (index === -1) {
      return response.status(404).json({ error: "Event not found" });
    }
    eventsBase.splice(index, 1);
    return response.status(204).send();
}