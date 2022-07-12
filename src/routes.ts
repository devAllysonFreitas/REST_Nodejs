import { Router, Request, Response, NextFunction } from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

const router = Router();

interface IUser {
  id: number;
  name?: string
}

interface IBody {
  ReqBody: IUser;
}

let users: IUser[] = [{id: 1, name: 'John'},{id: 2, name: 'Allyson'}]

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send(users);
}); 

router.get('/users/:uuid', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const finduser = users.find(user => user.id === Number(id));

  if(!finduser) return res.status(StatusCodes.NOT_FOUND).json({
		error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
	});

  res.status(StatusCodes.OK).send(finduser);
}); 

router.post('/users', (req: Request<IBody>, res: Response, next: NextFunction) => {
  const { id, name } = req.body;

  if(!id || !name) return res.status(StatusCodes.NOT_FOUND).json({
		error: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE)
	})

  const findUser = users.find(user => user.id === Number(id));

  if(findUser) return res.status(StatusCodes.NOT_FOUND).json({
		error: getReasonPhrase(StatusCodes.CONFLICT)
	})

  users.push({id, name});

  res.status(StatusCodes.OK).send(users);
}); 

router.put('/users/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!id ) return res.status(StatusCodes.NOT_FOUND).json({
		error: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE)
	})

  const findUser = users.find(user => user.id === Number(id));

  if(!findUser) return res.status(StatusCodes.NOT_FOUND).json({
		error: getReasonPhrase(StatusCodes.NOT_FOUND)
	})

  const newArray: any= users.map(user => {
    if(user.id === Number(id)){
      return {
        id: Number(id),
        name
      }
    }

    return user;
  })

  users = newArray;

  res.status(StatusCodes.OK).send(users);
});

export { router };