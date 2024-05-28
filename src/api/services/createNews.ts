import { Repository } from "../repositories/protocol/repository"
import { Service, ServiceReponse } from "./type"


export interface CreateNewsData {
  titulo: string
  descricao: string
}

export class CreateNewsError extends Error {
  constructor() {
    super('It was not possible to create news')
    this.name = 'CreateNewsError'
  }
}

export class TitleNotProvidedError extends Error {
  constructor() {
    super('Title is a required field.')
    this.name = 'TitleNotProvidedError'
  }
}

export class DescriptionNotProvidedError extends Error {
  constructor() {
    super('Description is a required field.')
    this.name = 'DescriptionNotProvidedError'
  }
}


export class CreateNewsService
  implements Service<{ title: string; description: string }>
{
  constructor(
    private readonly newsRepository: Repository
  ) {}

  async execute(
    createNewsData: CreateNewsData
  ): Promise<ServiceReponse<{ title: string; description: string }>> {


    if (!createNewsData.titulo) {
      return {
        isSuccess: false,
        error: new TitleNotProvidedError()
      }
    } else if (!createNewsData.descricao) {
      return {
        isSuccess: false,
        error: new DescriptionNotProvidedError()
      }
    }

    const news = await this.newsRepository.createNews({
      titulo: createNewsData.titulo,
      descricao: createNewsData.descricao
    })

    if (news !== undefined) {
      return { isSuccess: true, data: { title: news.titulo, description: news.descricao } }
    } else {
      return {
        isSuccess: false,
        error: new CreateNewsError()
      }
    }
  }
}
