import { HttpResponse, HttpStatusCode } from './protocols'

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
})

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
})

export const noContent = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.NO_CONTENT,
  body,
})

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  }
}

export const serverError = (errorMessage?: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: errorMessage || 'Something went wrong',
  }
}

export const unauthorized = (errorMessage?: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.UNAUTHORIZED,
    body: errorMessage || 'Unauthorized access',
  }
}

export const unprocessableEntity = (
  errorMessage?: string,
): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
    body: errorMessage || 'Something went wrong',
  }
}

export const conflict = (errorMessage?: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.CONFLICT,
    body: errorMessage || 'Something went wrong',
  }
}
