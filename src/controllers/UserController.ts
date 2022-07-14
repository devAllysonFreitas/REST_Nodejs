import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

interface IUser {
  id: number;
  name?: string;
  password: string;
}

export class UserController {
  
  async getUsers(req: Request, res: Response){
    const usersAll = await userRepository.findAllUsers();
    
    res.status(StatusCodes.OK).send(usersAll);
  }
  
  async getUser(req: Request<{uuid: string}>, res: Response, next: NextFunction){
    try {
      console.log(req.headers.authorization);
      
      const { uuid } = req.params;
      const user = await userRepository.findUser(uuid);
      res.status(StatusCodes.OK).send(user);
    }catch(err) {
      next(err);
    }
  }

  async createUser (req: Request<IUser>, res: Response){
    const { username, password } = req.body;

    const user = await userRepository.createUser(username, password);
    
    if(!user) {
      res.status(StatusCodes.NOT_FOUND).send("error creating user");
    }
  
    res.status(StatusCodes.OK).send(user);
  }

  async updateUser (req: Request<{uuid: string}>, res: Response){
    const { uuid } = req.params;
    const { username, password } = req.body;

    const userUpdate = await userRepository.updateUser(uuid, username, password);

    res.status(StatusCodes.OK).send(userUpdate);
  }

  async deleteUser (req: Request<{uuid: string}>, res: Response){
    const { uuid } = req.params;

    const userUpdate = await userRepository.deleteUser(uuid);

    res.status(StatusCodes.NO_CONTENT).send(userUpdate);
  }
}