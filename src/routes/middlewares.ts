import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '@/useCases/configs';
import { serverError, unauthorized } from '@/useCases/responses';
import { authController } from '@/useCases/auth'
import { RegisterRepositoryTypeEnum } from '@/repositories/auth/register/RegisterRepositoryTypeEnum'

export async function ensureAuthenticated(req: any, res: any, next: any) {
  const accessToken = req.headers.authorization

  if (!accessToken) {
    handleUnauthorizedError(res, 'Access token not found');
    return;
  }

  const invalidAccessToken = await authController.handle(
    RegisterRepositoryTypeEnum.InvalidAccessToken,
    { body: accessToken }
  )

  if (invalidAccessToken.body) {
    handleUnauthorizedError(res, 'Access token invalid');
    return;
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload
    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp }
    req.user = { id: decodedAccessToken.id }

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      handleUnauthorizedError(res, 'Access token expired');
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      handleUnauthorizedError(res, 'Access token invalid');
      return;
    } else {
      const { statusCode, body } = serverError(error.message);
      res.status(statusCode).send(body);
    }
  }
}

function handleUnauthorizedError(res, message) {
  const { statusCode, body } = unauthorized(message);
  res.status(statusCode).send(body);
}
