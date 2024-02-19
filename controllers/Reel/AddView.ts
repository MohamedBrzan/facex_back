import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reelId } = req.body;

    const userId = (await getUserId(req)).toString();

    let reel = await Reel.findById(reelId);

    if (!reel)
      return next(new ErrorHandler(404, `cannot find reel with id ${reelId}`));

    const findUser = reel.views.findIndex((user) => user.toString() === userId);

    if (findUser >= 0)
      return next(new ErrorHandler(404, `you already pushed in reel views`));

    reel = await Reel.findByIdAndUpdate(
      reelId,
      {
        $push: {
          views: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    const { views } = reel;

    return res
      .status(200)
      .json({ msg: `added user with id ${userId} to reel views`, views });
  }
);
