import {DateTime} from "luxon"

export interface Event{
    id: string,
    title: string,  
    description: string,
    startTime: DateTime,
    endTime: DateTime
}