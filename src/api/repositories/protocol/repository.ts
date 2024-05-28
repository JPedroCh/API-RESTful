import { Noticia } from "../../../database/entities/news"

export interface Repository {
  createNews(params: {
    titulo: string
    descricao: string
  }): Promise<Noticia | undefined>
  listAll(): Promise<Noticia | undefined>
  updateOne(params: {
    id: number
    title: string
    description: string
  }): Promise<Noticia | undefined> 
  deleteOne(params: {
    id: number
  }): Promise<Noticia | undefined>
}
