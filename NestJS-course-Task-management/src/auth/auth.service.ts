import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService, // provided by JWTModule
  ) {}

  async signUp(authCredsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredsDto);
  }

  async signIn(authCredsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username }; // payload for JWT token
    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
}
