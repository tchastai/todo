import { Request as ExpressRequest } from 'express';

export interface AuthenticatedRequest extends ExpressRequest {
  identity: {
    id: string;
    email: string;
  };
}
