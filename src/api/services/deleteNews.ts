import { Repository } from "../repositories/protocol/repository"
import { Service, ServiceResponse } from "./type"

export interface DeleteNewsData {
  id: number
}

export class DeleteNewsError extends Error {
  constructor() {
    super('It was not possible to delete the news.')
    this.name = 'DeleteNewsError'
  }
}

export class DeleteNewsService implements Service<{ message: string }> {
  constructor(
    private readonly newsRepository: Repository
  ) {}

  async execute(newsDeleteData: DeleteNewsData): Promise<ServiceResponse<{ message: string }>> {
      
      const news = await this.newsRepository.deleteOne(newsDeleteData)
  
      if (news !== undefined) {
        return { isSuccess: true, data: {message: "News deleted successfully"} }
      } else {
        return {
          isSuccess: false,
          error: new DeleteNewsError()
        }
      }
  }
}
