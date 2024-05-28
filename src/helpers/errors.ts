export class ServerError extends Error {
  constructor(error?: Error) {
    super(error?.message)
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}
