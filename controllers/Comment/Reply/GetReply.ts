import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import ErrorHandler from '../../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const reply = await Reply.findById(id);
    if (!reply)
      return next(new ErrorHandler(404, `Reply With Id ${id} Not Exist`));
    res.status(200).json(reply);
  }
);
