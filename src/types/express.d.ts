/* Learned that this file was necessary to allow for req.task = task in parseID.ts to work
since typescript wont allow for you to edit the req object unless explecitly done.*/
import type { Task } from "../types/task";

declare global {
  namespace Express {
    interface Request {
      task?: Task; 
    }
  }
}

//The ? after task makes the property optional so I don't have to declare it all the time.