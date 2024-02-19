import { Request, Response } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';

export default AsyncHandler((req: Request, res: Response) =>
  res.redirect('/profile')
);
