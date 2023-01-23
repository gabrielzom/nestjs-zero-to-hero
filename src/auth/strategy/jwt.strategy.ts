import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppConstants } from 'constants/app.constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, UserPayload } from 'utils/types';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConstants.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    return { id: payload.sub, email: payload.email };
  }
}
