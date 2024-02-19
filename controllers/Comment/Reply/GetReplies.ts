import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json(await Reply.find())
);
