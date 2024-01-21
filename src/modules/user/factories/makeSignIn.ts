import { SignInUserService } from '../Service/SigninUser';
import { EncrypterAdapter } from '../adapters/EncrypterAdapter';
import { JwtToken } from '../adapters/JwtToken';
import { SignInData } from '../domain/useCases/SigninUser';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function signIn (data: SignInData) {
  const userRepo = new PrismaUserRepository();
  const encrypter = new EncrypterAdapter(12);
  const secret = process.env.TOKEN_SECRET as string;
  const token = new JwtToken(secret);

  const signIn = new SignInUserService(userRepo, encrypter, token);

  return await signIn.signIn(data);
}
