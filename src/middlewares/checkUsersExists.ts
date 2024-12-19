import * as express from "express";
import { User } from "../@types/User";

export function checkUserAlreadyExists(usersBase: User[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username } = req.body;

    const userAlreadyExists = usersBase.some((user) => user.username === username);

    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    return next();
  };
}
