import { Request, Response, NextFunction } from 'express';
export default (controllers: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(controllers(req, res, next)).catch(next);
