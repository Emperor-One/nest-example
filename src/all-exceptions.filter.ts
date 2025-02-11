import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientValidationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type CustomResopnseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionsFilter.name)

    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        const responseObj: CustomResopnseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException) {
            responseObj.statusCode = exception.getStatus()
            responseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError || exception instanceof PrismaClientKnownRequestError) {
            responseObj.statusCode = 422
            responseObj.response = exception.message.replaceAll(/\n/g,'')
        } else {
            responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            responseObj.response = "Internal Server Error"
        }

        response
            .status(responseObj.statusCode)
            .json(responseObj)

        this.logger.error(responseObj.response, AllExceptionsFilter.name)

        super.catch(exception, host)
    }
}