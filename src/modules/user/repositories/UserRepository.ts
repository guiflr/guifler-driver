import { UserModel } from '../domain/models/UserModel';

export interface UserDTO extends UserModel {
  id: number;
}

export interface UserRepository {
  store(user: UserModel): Promise<UserDTO>;
  update(user: UserModel, userId: number): Promise<void>;
  findAll(): Promise<UserDTO[]>;
}
