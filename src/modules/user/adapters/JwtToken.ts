import { Token } from '../presentation/Token';
import jwt from 'jsonwebtoken';

export class JwtToken implements Token {
  constructor (private secret: string) {}
  generate (data: any): string {


    const token = jwt.sign(data, this.secret);

    return token;
  }
}
