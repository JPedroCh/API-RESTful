import { Repository } from "../repositories/protocol/repository"
import { Service, ServiceResponse } from "./type"


export interface UpdateNewsData {
  newsId: string
  title: string
  description: string
}

export class UpdateNewsError extends Error {
  constructor() {
    super('It was not possible to update the news.')
    this.name = 'UpdateNewsError'
  }
}

export class UpdateNewsService implements Service<{ message: string }> {
  constructor(
    private readonly newsRepository: Repository
  ) {}

  async execute(
    newsUpdate: UpdateNewsData
  ): Promise<ServiceResponse<{ message: string }>> {
      
      const news = await this.newsRepository.updateOne({
        ...newsUpdate
      })
  
      if (news !== undefined) {
        return { isSuccess: true, data: {message: "News updated successfully"} }
      } else {
        return {
          isSuccess: false,
          error: new UpdateNewsError()
        }
      }
  }
}
