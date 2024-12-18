import * as express from "express";
import { Event } from "../@types/Event";
import { DateTime } from "luxon";

export function checkEventConflict(eventsBase: Event[]) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const { startTime, endTime } = req.body;
      const newStart = DateTime.fromISO(startTime);
      const newEnd = DateTime.fromISO(endTime);
  
      const conflict = eventsBase.some(event => {
        const existingStart = event.startTime
        const existingEnd = event.endTime
        // Verifica se há sobreposição de horários
        return (
          (newStart >= existingStart && newStart < existingEnd) || 
          (newEnd > existingStart && newEnd <= existingEnd) || 
          (newStart <= existingStart && newEnd >= existingEnd) 
        );
      });
  
      if (conflict) {
        console.log("Conflito de horário detectado! Evento não pode ser criado.");
        return res.status(400).json({ error: "Conflito de horário detectado com outro evento." });
      }
  
      next();
    };
  }
  