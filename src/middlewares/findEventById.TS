import * as express from "express";
import { Event } from "../@types/Event";

export function findEventById(eventsBase: Event[]) {
    return(req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { eventId } = req.params;
        const event = eventsBase.find((event) => event.id === eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        req.body.event = event;
        return next();
    }
}