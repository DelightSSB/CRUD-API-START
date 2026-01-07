import type { Request, Response, NextFunction } from "express";
import { HttpError } from "./HttpError.js";

const errorHandler = (err:Error , req:Request, res:Response, next:NextFunction) => {
    //Note: use if/else to detect err type rather than nested terneries

    if(err instanceof HttpError){
        res.status((err.statusCode) || 500).json({msg: err.message});
    }else{
        res.status((err as any).status || 500).json({msg: err.message});
    }


};


export default errorHandler;