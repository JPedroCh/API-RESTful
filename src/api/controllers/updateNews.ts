
import { Controller } from '.'
import { BadRequestError } from '../../helpers/errors'
import { HttpResponse, badRequest, serverError, successfuRequest } from '../../helpers/http'
import NewsRepository from '../repositories/newsRepository'
import { UpdateNewsData, UpdateNewsError, UpdateNewsService } from '../services/updateNews'

type Model =
  | Error
  | {
      message: string
    }

export class UpdateNewsController extends Controller {
  constructor(private readonly updateNews: UpdateNewsService) {
    super()
  }

  async perform(httpRequest: UpdateNewsData): Promise<HttpResponse<Model>> {
    const news = httpRequest
    const response = await this.updateNews.execute(news)

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data)
    } else {
      if (response.error instanceof UpdateNewsError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}

export const updateNews = () => {
  const newsRepository = new NewsRepository()
  return new UpdateNewsService(newsRepository)
}

export const makeUpdateNewsController = () => {
  return new UpdateNewsController(updateNews())
}