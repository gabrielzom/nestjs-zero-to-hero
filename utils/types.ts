export type JwtTokenDecoded = {
  sub: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  iat: BigInt;
  exp: BigInt;
};

export type Token = {
  token: string;
};

export type JwtPayload = {
  sub: number;
  email: string;
};

export type UserPayload = {
  id: number;
  email: string;
};
