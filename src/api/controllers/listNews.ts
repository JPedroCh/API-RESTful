import { HttpResponse, badRequest, serverError, successfuRequest } from '../../helpers/http'
import { BadRequestError } from '../../helpers/errors'
import { ListNewsError, ListNewsService, News } from '../services/listNews'
import { Controller } from '.'
import NewsRepository from '../repositories/newsRepository'

type Model = Error | News[]

export class ListNewsController extends Controller {
  constructor(private readonly listNews: ListNewsService) {
    super()
  }

  async perform(): Promise<HttpResponse<Model>> {
    const response = await this.listNews.execute()
    if (response.isSuccess && response.data) {
      return successfuRequest(response.data)
    } else {
      if (response.error instanceof ListNewsError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}

export const listNews = () => {
  const newsRepository = new NewsRepository()
  return new ListNewsService(newsRepository)
}

export const makeListNewsController = () => {
  return new ListNewsController(listNews())
}