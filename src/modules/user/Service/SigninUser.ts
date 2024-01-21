import { missingParamError } from '../../../shared/errors/missingParamsError';
import { singInError } from '../../../shared/errors/signInError';
import { SignInData, SignInResponse, SignInUser } from '../domain/useCases/SigninUser';
import { Encrypter } from '../presentation/Encrypter';
import { Token } from '../presentation/Token';
import { UserRepository } from '../repositories/UserRepository';

export class SignInUserService implements SignInUser {
  constructor (
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private token: Token
  ) {}
  async signIn ({ email, password }: SignInData): Promise<SignInResponse> {
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

    const { role, id } = user;

    const token = this.token.generate({ role, id });

    return { ...user, token };
  }
}
