export interface ServiceResponse<T> {
  isSuccess: boolean
  data?: T
  error?: Error
}

export interface Service<T> {
  execute(data: any): Promise<ServiceResponse<T>>
}