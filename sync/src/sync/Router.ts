import { Router, Response, NextFunction } from 'express';

import { getSyncService } from './Service';
import { authorizationMiddleware, ressourceOwnerAuthorizationMiddleware } from '../identity/Router';
import { AuthenticatedRequest } from '../helpers/AuthenticatedRequest';

const syncRouter = Router();

const syncService = getSyncService();

syncRouter.use(authorizationMiddleware);

syncRouter.get('/', async function (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const userLists = await (await syncService).getLists(request.identity.email);
    response.json({ lists: userLists?.lists });
  } catch (error) {
    next(error);
  }
});

syncRouter.put('/', ressourceOwnerAuthorizationMiddleware, async function (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const { userEmail, lists } = request.body;
    const userLists = await (await syncService).synchronize(userEmail, lists);
    response.json(userLists);
  } catch (error) {
    next(error);
  }
});

export default syncRouter;
