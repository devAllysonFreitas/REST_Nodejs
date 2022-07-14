import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../models/errors/forbidden.error';
import JWT from 'jsonwebtoken';
import { User } from '../models/user.model';

export default async function jwtAthenticationMiddleware(req: Request, res: Response, next: NextFunction){
  try {
    const authorizarionHeader = req.headers.authorization;
    
    if(!authorizarionHeader) {
      throw new ForbiddenError('crendenciais não aceita!');
    }

    const [typeAuthorization, token] = authorizarionHeader.split(' ');
    console.log(typeAuthorization, token);
    

    if(typeAuthorization !== 'Bearer' || !token){
      throw new ForbiddenError('tipo de Authorizarion invalido!');
    }

    if(!token){
      throw new ForbiddenError('token invalido!');
    }

    const tokenPayload =  JWT.verify(token, 'my_secret_key');

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
      throw new ForbiddenError('uuid invalido!');
    }

  
    const user:User = {
      uuid: tokenPayload.uuid,
      username: tokenPayload.username
    }

    
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}