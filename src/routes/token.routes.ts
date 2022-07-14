import { Router } from 'express';
import { AuthorizarionController } from '../controllers/authorizarionController';
import  BasicAuthentication from '../middlewares/basic-authentication';
import jwtAthenticationMiddleware from '../middlewares/jwt-authentication';

const routerToken = Router();

// cadasatros tokens
routerToken.post('/token', BasicAuthentication, new AuthorizarionController().createToken);

routerToken.post('/token/validate', jwtAthenticationMiddleware, new AuthorizarionController().validate);


export { routerToken };