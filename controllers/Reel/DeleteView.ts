import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reelId, userId } = req.body;

    let reel = await Reel.findById(reelId);

    if (!reel)
      return next(new ErrorHandler(404, `cannot find reel with id ${reelId}`));

    reel = await Reel.findByIdAndUpdate(
      reelId,
      {
        $pull: {
          views: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    const { views } = reel;

    return res.status(200).json({
      msg: `deleted user with id ${userId} from reel views successfully`,
      views,
    });
  }
);
