import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Hashtag from '../../models/Hashtag/Hashtag';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let hashtag = await Hashtag.findById(id);
    if (!hashtag)
      return next(new ErrorHandler(404, `Hashtag With Id ${id} Not Exist`));

    res.status(200).json(hashtag);
  }
);
