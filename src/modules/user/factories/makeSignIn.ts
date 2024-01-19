import { SignInUserService } from '../Service/SigninUser';
import { EncrypterAdapter } from '../adapters/EncrypterAdapter';
import { SignInData } from '../domain/useCases/SigninUser';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function signIn(data: SignInData) {
  const userRepo = new PrismaUserRepository();
  const encrypter = new EncrypterAdapter(12);

  const signIn = new SignInUserService(userRepo, encrypter);

  return await signIn.signIn(data);
}
