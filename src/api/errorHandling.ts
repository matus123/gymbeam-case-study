import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ZodIssue } from 'zod';

export class ValidationHttpException extends BadRequestException {
    public errorCode: string;
    public errors: ZodIssue[];
    constructor(obj: { message: string; errorCode: string; errors: ZodIssue[] }) {
        super(obj.message);
        this.errorCode = obj.errorCode;
        this.errors = obj.errors;
    }
}

@Catch(ValidationHttpException)
export class ValidationHttpExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationHttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<ExpressResponse>();
        const status = exception.getStatus();

        response.status(status).json({
            message: exception.message,
            errorCode: exception.errorCode,
            errors: exception.errors,
        });
    }
}
