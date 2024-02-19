import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Hashtag from '../../models/Hashtag/Hashtag';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;

    let hashtag = await Hashtag.findById(hashtagId);

    if (!hashtag)
      return next(
        new ErrorHandler(404, `Hashtag With Id ${hashtagId} Not Exist`)
      );

    hashtag = await Hashtag.findByIdAndUpdate(hashtagId, req.body, {
      runValidators: true,
      new: true,
      upsert: true,
    });

    return res.status(200).json(hashtag);
  }
);
