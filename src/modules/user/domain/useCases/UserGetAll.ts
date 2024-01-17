import { UserDTO } from '../../repositories/UserRepository';

export interface UserGetAll {
  getAll(): Promise<UserDTO[]>;
}
