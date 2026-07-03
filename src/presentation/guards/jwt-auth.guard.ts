import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({ title: 'Unauthorized', message: 'Missing authentication token.' });
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) {
        throw new Error('JWT_SECRET is not configured.');
      }
      
      const payload = jwt.verify(token, secret);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException({ title: 'Unauthorized', message: 'Invalid authentication token.' });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    
    // Some API clients (like Swagger) automatically add 'Bearer', causing users to accidentally send 'Bearer Bearer <token>'
    const match = authHeader.match(/Bearer\s+(?:Bearer\s+)?(\S+)/i);
    return match ? match[1] : undefined;
  }
}
