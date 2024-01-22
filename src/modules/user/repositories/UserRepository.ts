import { UserModel } from '../domain/models/UserModel';
import { SignInData } from '../domain/useCases/SigninUser';

export interface UserDTO extends UserModel {
  id: number;
}

export interface UserRepository {
  store(user: UserModel): Promise<UserDTO>;
  update(user: UserModel, userId: number): Promise<void>;
  findAll(): Promise<UserDTO[]>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findBy(id: number): Promise<UserDTO | null>;
}
