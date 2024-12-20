import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import usersBase from "../data/usersBase";

export function createUser(request: Request, response: Response): Response {
    const { username } = request.body;

    if (!username) {
        return response.status(400).json({ error: "Username is required." });
    }

    const id = uuidv4();
    usersBase.push({
        id,
        username,
    });

    return response.status(201).json(usersBase);
}

export function listUsers(request: Request, response: Response): Response {
    return response.status(200).json(usersBase);
}

export function getUser(request: Request, response: Response): Response {
    const user = request.body.user;
    return response.status(200).json(user);
}

export function changeUser(request: Request, response: Response): Response {
    const user = request.body.user;
    const { username } = request.body;
    if( username !== undefined) user.username = username
    return response.status(200).json(user);
}

export function deleteUser(request: Request, response: Response): Response {
    const user = request.body.user;

  const index = usersBase.indexOf(user);

  if (index === -1) {
    return response.status(404).json({ error: "User not found" });
  }

  usersBase.splice(index, 1);
  return response.status(204).send();
}