import { Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';

export default AsyncHandler(async (req: Request, res: Response) =>
  res.status(200).json(await Comment.find().populate('user'))
);
