import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JzIjiHOZY1ydEfz2u7TGRQ==',
    });
  }

  async validate(payload: { email: string }) {
    const users = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    return users;
  }
}
