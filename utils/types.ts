import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class JwtTokenDecoded {
  sub: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  iat: BigInt;
  exp: BigInt;
}

export class Token {
  @ApiProperty({
    type: 'string',
    format: 'email',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;
}

export class JwtPayload {
  sub: number;
  email: string;
}

export class UserPayload {
  id: number;
  email: string;
}
