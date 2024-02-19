import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, visiblePrivacy, commentId } = req.body;

    let comment = await Comment.findById(commentId);

    if (!comment)
      return next(
        new ErrorHandler(404, `This Comment Id ${commentId} Not Found`)
      );

    comment = await Comment.findByIdAndUpdate(
      commentId,
      { message, visiblePrivacy },
      {
        runValidators: true,
        new: true,
        upsert: true,
      }
    );
    return res.status(200).json(comment);
  }
);
