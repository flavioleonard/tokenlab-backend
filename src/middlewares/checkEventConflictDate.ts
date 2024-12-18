import * as express from "express";
import { Event } from "../@types/Event";

function checkEventConflict(eventsBase: Event[]) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const { startTime, endTime } = req.body;
  
      const newStart = new Date(startTime);
      const newEnd = new Date(endTime);
  
      const conflict = eventsBase.some(event => {
        const existingStart = new Date(event.startTime);
        const existingEnd = new Date(event.endTime);
  
        // Verifica se há sobreposição de horários
        return (
          (newStart >= existingStart && newStart < existingEnd) || // Começo do novo evento está dentro de um existente
          (newEnd > existingStart && newEnd <= existingEnd) || // Fim do novo evento está dentro de um existente
          (newStart <= existingStart && newEnd >= existingEnd) // Novo evento engloba um existente
        );
      });
  
      if (conflict) {
        console.log("Conflito de horário detectado! Evento não pode ser criado.");
        return res.status(400).json({ error: "Conflito de horário detectado com outro evento." });
      }
  
      next();
    };
  }
  