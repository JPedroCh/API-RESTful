export interface ServiceReponse<T> {
  isSuccess: boolean
  data?: T
  error?: Error
}

export interface Service<T> {
  execute(data: any): Promise<ServiceReponse<T>>
}