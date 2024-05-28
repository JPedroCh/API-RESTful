import { Noticia } from "../../../database/entities/news"

export interface Repository {
  createNews(params: {
    titulo: string
    descricao: string
  }): Promise<Noticia | undefined>
  listAll(): Promise<Noticia | undefined>
}
