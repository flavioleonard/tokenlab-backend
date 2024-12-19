import * as express from "express";
import { User } from "../@types/User";

export function findUserById(usersBase: User[]) {
    return(req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { userId } = req.params;
        const user = usersBase.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.body.user = user;
        return next();
    }
}