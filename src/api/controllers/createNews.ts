import { Controller } from "."
import { BadRequestError } from "../../helpers/errors"
import { HttpResponse, badRequest, serverError, successfuRequest } from "../../helpers/http"
import NewsRepository from "../repositories/newsRepository"
import { CreateNewsService } from "../services/createNews"

type HttpRequest = {
  titulo: string
  descricao: string
}

type Model = 
  | Error
  | {
      title: string
      description: string
    }

export const createNews = () => {
  const newsRepository = new NewsRepository()
  return new CreateNewsService(newsRepository)
}

export class CreateNewsController extends Controller {
  constructor(private readonly createNews: CreateNewsService) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createNews.execute(params)
    if (response.isSuccess && response.data) return successfuRequest(response.data)

    if (response.error)
      return badRequest(new BadRequestError(response.error.message))

    return serverError(response.error)
  }
}

export const makeCreateNewsController = () => {
  return new CreateNewsController(createNews())
}