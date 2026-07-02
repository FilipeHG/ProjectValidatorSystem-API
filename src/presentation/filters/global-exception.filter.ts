import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { InfrastructureException, AiProviderException } from '../../infrastructure/exceptions/infrastructure.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let type = 'internal-error';
    let title = 'Internal Server Error';
    let detail = 'Unexpected system error.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse() as any;
      type = status === 401 ? 'authentication-error' : status === 400 ? 'validation-error' : status === 404 ? 'resource-not-found' : 'http-error';
      
      title = responseBody.error || responseBody.title || 'HTTP Error';
      if (status === 401 && !responseBody.title) title = 'Unauthorized';
      if (status === 404 && !responseBody.title) title = 'Resource Not Found';
      if (status === 400 && !responseBody.title) title = 'Validation Error';

      detail = typeof responseBody.message === 'string' 
        ? responseBody.message 
        : (Array.isArray(responseBody.message) ? responseBody.message.join(', ') : exception.message);
    } else if (exception instanceof DomainException) {
      status = HttpStatus.CONFLICT;
      type = 'business-rule-violation';
      title = 'Business Rule Violation';
      detail = exception.message;
    } else if (exception instanceof AiProviderException) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      type = 'ai-provider-error';
      title = 'AI Provider Failure';
      detail = exception.message;
    } else if (exception instanceof InfrastructureException) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      type = 'infrastructure-error';
      title = 'Service Unavailable';
      detail = exception.message;
    }

    const correlationId = request.headers['x-correlation-id'] || 'N/A';

    if (status >= 500) {
      this.logger.error(
        `[${correlationId}] ${request.method} ${request.url} - ${status} - ${detail}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `[${correlationId}] ${request.method} ${request.url} - ${status} - ${detail}`,
      );
    }

    response.status(status).json({
      type,
      title,
      status,
      detail,
      instance: request.url,
      correlationId,
    });
  }
}
