import { missingParamError } from '../../../shared/errors/missingParamsError';
import { singInError } from '../../../shared/errors/signInError';
import { SignInData, SignInUser } from '../domain/useCases/SigninUser';
import { Encrypter } from '../presentation/Encrypter';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export class SignInUserService implements SignInUser {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter
  ) {}
  async signIn({ email, password }: SignInData): Promise<UserDTO> {
    if (!email) {
      throw missingParamError('email was not sent');
    }

    if (!password) {
      throw missingParamError('password was not sent');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw singInError();
    }

    const isValidPassword = await this.encrypter.isValid(password, user.password);

    if (!isValidPassword) {
      throw singInError();
    }

    return user;
  }
}
