export type UserModel = {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'creator' | 'guest';
  };

  export type UpdateUserModel = {
    username: string;
    email: string; 
    role: 'admin' | 'creator' | 'guest';
  }