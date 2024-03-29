import { UserCreateModel } from '../../modules/user/domain/useCases/UserCreate';
import {
  UserValidator,
  UserValidatorResponse,
} from '../../modules/user/presentation/UserValidator';
import { UserModel } from '../../modules/user/domain/models/UserModel';
import { Encrypter } from '../../modules/user/presentation/Encrypter';
import { UserDTO, UserRepository } from '../../modules/user/repositories/UserRepository';

export const addUserData: UserCreateModel = {
  email: 'email@email.com',
  password: 'password',
  passwordConfirm: 'password',
  role: 'admin',
  username: 'user',
};

export const user: UserDTO = {
  email: 'email@email.com',
  id: 1,
  password: 'password',
  role: 'admin',
  username: 'user',
};

export class UserValidatorTest implements UserValidator {
  validator (user: UserCreateModel): UserValidatorResponse {
    return { error: '', isValid: true };
  }
}

export class EncrypterTest implements Encrypter {
  isValid (value: string, hashedValue: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async encrypt (value: string): Promise<string> {
    return 'hashed-value';
  }
}

export class UserRepositoryTest implements UserRepository {
  async findBy (id: number): Promise<UserDTO | null> {
    return null;
  }
  findByEmail (email: string): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  findAll (): Promise<UserDTO[]> {
    throw new Error('Method not implemented.');
  }
  async update (user: UserModel): Promise<void> {}
  async store (data: UserModel): Promise<UserDTO> {
    return user;
  }
}
