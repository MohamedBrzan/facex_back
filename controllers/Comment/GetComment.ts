import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment)
      return next(new ErrorHandler(404, `Comment With Id ${id} Not Exist`));
    res.status(200).json(comment);
  }
);
