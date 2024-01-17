export interface UserRepository {
  get(userId: number): Promise<{ id: number } | null>;
}
