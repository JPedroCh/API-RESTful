import { Repository } from '../repositories/protocol/repository'
import { Service, ServiceResponse } from './type'

export class ListNewsError extends Error {
  constructor() {
    super('It was not possible to list the news!')
    this.name = 'GetNewsError'
  }
}

export interface News {
  title: string;
  description: string;
}

export class ListNewsService implements Service<News[]> {
  constructor(private readonly newsRepository: Repository) {}
  async execute(): Promise<ServiceResponse<News[]>> {
    let newsFound = null

    newsFound = await this.newsRepository.listAll()

    if (newsFound) {
      const returnedValue = (
        newsFound instanceof Array ? newsFound : [newsFound]
      ) as News[]
      return { isSuccess: true, data: returnedValue }
    }
    return {
      isSuccess: false,
      error: new ListNewsError()
    }
  }
}
