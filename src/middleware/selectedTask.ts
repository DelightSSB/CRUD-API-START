import type { Request, Response, NextFunction } from "express";
import { HttpError } from "./httperror.js";
import tasks from "../data/tasks.js";

const parseID = (req:Request, res:Response, next:NextFunction) =>{

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new HttpError("Invalid task id given", 400));
  }
    const task = tasks.find((task) => task.id === id);
    if(!task){
        const error = new HttpError(`Task with id ${id} was not found`, 404);
        return next(error)
    }

    req.task = task;
    next();
};

export default parseID;