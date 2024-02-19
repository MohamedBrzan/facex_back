import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import ErrorHandler from '../../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.body;

    let reply = await Reply.findById(replyId);

    if (!reply)
      return next(new ErrorHandler(404, `This Reply Id ${replyId} Not Found`));

    reply = await Reply.findByIdAndUpdate(replyId, req.body, {
      runValidators: true,
      new: true,
      upsert: true,
    });
    return res.status(200).json(reply);
  }
);
