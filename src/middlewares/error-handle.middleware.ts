import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DatabaseError } from "../models/errors/database.error.model";
import { ForbiddenError } from "../models/errors/forbidden.error";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
  if(error instanceof DatabaseError){
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }else if(error instanceof ForbiddenError){
    res.status(StatusCodes.FORBIDDEN).json(error.message);
  }else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}