import { Event } from "./Event";
export interface User {
    id: string;
    username: string;
    password: string;
    events: Event [];
  }