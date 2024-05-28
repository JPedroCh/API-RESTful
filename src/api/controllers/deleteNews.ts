
import { Controller } from '.'
import { BadRequestError } from '../../helpers/errors'
import { HttpResponse, badRequest, serverError, successfuRequest } from '../../helpers/http'
import NewsRepository from '../repositories/newsRepository'
import { DeleteNewsData, DeleteNewsError, DeleteNewsService } from '../services/deleteNews'

type Model =
  | Error
  | {
      message: string
    }

export class DeleteNewsController extends Controller {
  constructor(private readonly deleteNews: DeleteNewsService) {
    super()
  }

  async perform(httpRequest: DeleteNewsData): Promise<HttpResponse<Model>> {
    const news = httpRequest
    const response = await this.deleteNews.execute(news)

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data)
    } else {
      if (response.error instanceof DeleteNewsError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}

export const deleteNews = () => {
  const newsRepository = new NewsRepository()
  return new DeleteNewsService(newsRepository)
}

export const makeDeleteNewsController = () => {
  return new DeleteNewsController(deleteNews())
}