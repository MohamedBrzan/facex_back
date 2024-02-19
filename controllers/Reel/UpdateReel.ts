import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reelId } = req.body;

    let reel = await Reel.findById(reelId);

    if (!reel)
      return next(new ErrorHandler(404, `cannot find reel with id ${reelId}`));

    reel = await Reel.findByIdAndUpdate(reelId, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return res.status(200).json(reel);
  }
);
