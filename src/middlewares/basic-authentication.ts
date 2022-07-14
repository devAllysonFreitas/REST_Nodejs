import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../models/errors/forbidden.error";
import userRepository from "../repositories/user.repository";

async function BasicAuthentication(req: Request, res: Response, next: NextFunction){
   try {
    const authorizarion  = req.headers.authorization;
       
      if(!authorizarion) {
        throw new ForbiddenError("crendenciais não aceita!");
      }

      const [typeAuthorization, token] = authorizarion.split(' ');

      if(typeAuthorization !== 'Basic' || !token){
        throw new ForbiddenError("tipo de Authorizarion invalido!");
      }

      const tokenContent = Buffer.from(token, 'base64').toString('utf8');

      const [username, password] = tokenContent.split(':');
      
      if(!username || !password){
        throw new ForbiddenError("crendenciais não preenchidas!");
      }

      const user = await userRepository.findByUsernameAndPassword(username, password);
      

      if(!user){
        throw new ForbiddenError("usuario ou senha invalidas!");
      }

      req.user = user;
      next();
   } catch (error) {
    next(error);
   }
}

export default BasicAuthentication;