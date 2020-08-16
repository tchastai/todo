import { Router, Request, Response, NextFunction } from 'express';

import { getIdentityService } from './Service';
import { AuthenticatedRequest } from '../helpers/AuthenticatedRequest';

const identityRouter = Router();

const identityService = getIdentityService();

export class AuthorizationError extends Error {
  public status?: number;

  constructor(message = '') {
    super(message);
    this.message = message;
    this.name = 'AuthorizationError';
    this.status = 401;
  }
}

/**
 * Checks the presence of an authorization token, validates this token
 * and adds the session information to the request object.
 *
 * @param request The express request object
 * @param _response The express response object
 * @param next The next middleware function
 */
export async function authorizationMiddleware(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
) {
  try {
    /**
     * The session Id extracted from the Bearer authorization header.
     * e.g. : authorization: Bearer **Aj1FYfwVwRMl0phdVccv/qzpT92Cl3YM+UJg/5gRCNk=**
     */
    const sessionId = request.headers?.authorization?.split(' ')[1];

    if (!sessionId) throw new AuthorizationError('Missing authorization header');

    const session = await (await identityService).authorize(sessionId);

    if (!session) throw new AuthorizationError('Invalid session');

    request.identity = session;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Checks that the requested ressource is owned by the session user.
 *
 * @param request The express request object
 * @param _response The express response object
 * @param next The next middleware function
 */
export async function ressourceOwnerAuthorizationMiddleware(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
) {
  try {
    const { userEmail } = request.body;
    if (userEmail !== request.identity.email) {
      throw new AuthorizationError('Ressource not authorized');
    }
    next();
  } catch (error) {
    next(error);
  }
}

identityRouter.post('/users', async function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    await (await identityService).createUser(request.body.email, request.body.password);
    response.status(201).send();
  } catch (error) {
    next(error);
  }
});

identityRouter.post('/authenticate', async function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const createdSession = await (await identityService).authenticate(
      request.body.email,
      request.body.password,
    );
    response.json({ token: createdSession.id });
  } catch (error) {
    next(error);
  }
});

export default identityRouter;
