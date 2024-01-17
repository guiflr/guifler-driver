import { UserDTO } from '../../repositories/UserRepository';

export type SignInData = {
  email: string;
  password: string;
};

export interface SignInUser {
  signIn(data: SignInData): Promise<UserDTO>;
}
