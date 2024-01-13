import { UserCreateModel } from '../domain/useCases/UserCreate';

export type UserValidatorResponse = {
  isValid: boolean;
  error: string;
};

export interface UserValidator {
  validator(user: UserCreateModel): UserValidatorResponse;
}
