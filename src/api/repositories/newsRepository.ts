import { dataSource } from '../../database/config'
import { Noticia } from '../../database/entities/news'
import { Repository } from './protocol/repository'

class NewsRepository implements Repository {
  private readonly newsRepository
  constructor() {
    this.newsRepository = dataSource.getRepository(Noticia)
  }

  async createNews(params: {
    titulo: string
    descricao: string
  }): Promise<Noticia | undefined> {
    const {
      titulo,
      descricao
    } = params

    const news = this.newsRepository.create({
      titulo,
      descricao
    })
    await this.newsRepository.save(news)
    return news
  }

  async listAll(): Promise<any> {
    const news = await this.newsRepository.find({})
    return news
  }
}

export default NewsRepository
