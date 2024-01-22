import { notFoundError } from '../../../shared/errors/notFoundError';
import { GetUser } from '../domain/useCases/GetUser';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export class GetUserService implements GetUser {
  constructor (private userRepository: UserRepository) {}
  async get (id: number): Promise<UserDTO> {
    const user = await this.userRepository.findBy(id);

    if (!user) {
      throw notFoundError('user not found');
    }

    return user;
  }
}
