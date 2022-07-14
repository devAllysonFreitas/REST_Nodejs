import { db } from "../database/connection";
import { DatabaseError } from "../models/errors/database.error.model";
import { User } from "../models/user.model";


class UserRespository {
  async findAllUsers(): Promise<User[]> {
    const query = `
                    select uuid, username 
                    from 
                    application_user
                    `;

    const { rows } = await db.query<User>(query);
    
    return rows || [];
  }

  async findUser(uuid: string): Promise<User> {
    try{
      const query = `
                   select uuid, username 
                   from 
                   application_user 
                   where 
                   uuid = $1`;

    const { rows } = await db.query<User>(query, [uuid]);
    const [ user ] = rows;
    
    
    if(!user){
      throw new DatabaseError("erro na consulta por id");
    }
    
    return user;
    }catch(err){
      throw new DatabaseError("erro na consulta por id", err);
    }
  }

  async createUser(username: string, password: string): Promise<User | null> {
    const query = `
                    INSERT INTO application_user (username, password) VALUES (
                      $1,
                      crypt($2, gen_salt('bf'))
                    );`
                    ;
    const { rows } = await db.query<User>(query, [username, password]);

    return rows ? {username, password } : null;
  }

  async updateUser(uuid: string, username: string, password: string): Promise<void> {
    const query = `
    update application_user 
    set 
    username = $1, password = $2 
    where uuid = $3
    `;
    
    await db.query<User>(query, [username, password, uuid]);
  }

  async deleteUser(uuid: string): Promise<User | void> {
    const query = `
     DELETE FROM application_user 
     where uuid = $1
    `;
    
    await db.query<User>(query, [uuid]);
  }

  async findByUsernameAndPassword(username: string, password?: string): Promise<User | null> {
    try {
      const query = `
                     select username, uuid 
                     from application_user 
                     where 
                     username = $1
                    `;
                    
      const { rows } = await db.query<User>(query, [username]);
      const [ user ] = rows;

      return !user ? null : user;
    } catch (error) {
      throw new DatabaseError("erro na consulta por username e password", error);
    }
  }

 async findById(uuid: string): Promise<User | null> {
    const query = `
    select username, uuid 
    from application_user 
    where 
    uuid = $1
  `;

  const { rows } = await db.query<User>(query, [uuid]);
  const [ user ] = rows;
  
  return user || null;
 }
} 

export default new UserRespository();
