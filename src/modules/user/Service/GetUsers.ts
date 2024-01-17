import { UserGetAll } from '../domain/useCases/UserGetAll';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export class GetUsers implements UserGetAll {
  constructor(private userRepository: UserRepository) {}
  async getAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
