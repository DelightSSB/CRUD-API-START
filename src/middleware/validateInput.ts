import type { Request, Response, NextFunction } from "express";
import { HttpError } from "./httperror.js";

//checks both if the input the user put in is a valid input and converts the completed value to boolean
const isValid = (req:Request, res:Response, next:NextFunction) =>{
    const{name , completed} = req.body;
    
      if((name === "" || name ===undefined) || (completed === "" || completed === undefined)){ //check if user entered both field
        const error = new HttpError(`Enter a valid tasks with name and completion status`, 400)
        return next(error)
      }else   if ( //check that completed field is in fact true or false
      typeof completed === "string" &&
      completed.toLowerCase() !== "true" &&
      completed.toLowerCase() !== "false"
    ){
        const error = new HttpError(`Completion property must be true or false`, 400);
        return next(error)
    }
      else{ //Convert completed into a boolean and create newTask 
        req.body.completed = typeof completed === "string"
        ? completed.toLowerCase() === "true"
        : completed;}
        next();
};

export default isValid;