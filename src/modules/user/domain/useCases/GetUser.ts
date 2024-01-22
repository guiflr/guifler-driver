import { UserDTO } from "../../repositories/UserRepository";

export interface GetUser {
  get(id: number): Promise<UserDTO>;
}
