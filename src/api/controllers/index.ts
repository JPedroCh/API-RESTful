import { HttpResponse, serverError } from "../../helpers/http"

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }
}