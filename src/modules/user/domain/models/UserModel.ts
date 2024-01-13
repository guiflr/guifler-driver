export type UserModel = {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'creator' | 'guest';
  };