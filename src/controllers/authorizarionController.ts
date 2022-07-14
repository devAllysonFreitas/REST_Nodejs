import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../models/errors/forbidden.error";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";

export class AuthorizarionController {
  async createToken( req: Request, res: Response, next: NextFunction){
    try{
      const user = req.user;

      if(!user) {
        throw new ForbiddenError("Usuario nao informado!");
      }

      const jwt = JWT.sign({username: user?.username}, 'my_secret_key', {subject: user?.uuid})
      res.status(StatusCodes.OK).json({ token: jwt })
    }catch(errors){
      next(errors);
    }
  }

  async validate(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json(req.user || null);
  }
}