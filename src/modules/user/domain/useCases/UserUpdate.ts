import { UserModel } from '../models/UserModel';

export type UserCreateModel = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: 'admin' | 'creator' | 'guest';
};

export interface UserUpdate {
  update(data: UserCreateModel): Promise<UserModel>;
}
