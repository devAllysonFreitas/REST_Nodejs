import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routerUsers = Router();
// cadasatros de usuarios
routerUsers.get('/users', new UserController().getUsers); 

routerUsers.get('/users/:uuid', new UserController().getUser); 

routerUsers.post('/users', new UserController().createUser); 

routerUsers.put('/users/:uuid', new UserController().updateUser);

routerUsers.delete('/users/:uuid', new UserController().deleteUser);

export { routerUsers }