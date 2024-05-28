import { BadRequestError, ServerError } from "./errors"

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const successfuRequest = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: new BadRequestError(error.message)
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
