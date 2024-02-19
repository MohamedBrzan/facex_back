import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reelId } = req.body;

    const userId = (await getUserId(req)).toString();
    const user = await User.findById(userId);

    let reel = await Reel.findById(reelId);

    if (!reel)
      return next(new ErrorHandler(404, `cannot find reel with id ${reelId}`));

    const findUser = reel.shares.findIndex(
      (user) => user.toString() === userId
    );

    if (findUser >= 0) {
      reel = await Reel.findByIdAndUpdate(
        reelId,
        {
          $pull: {
            shares: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.shares.reels.splice(user.shares.reels.indexOf(reelId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unshared successfully for reel ${reel.title}`,
        shares: user.shares.reels,
      });
    }

    reel = await Reel.findByIdAndUpdate(
      reelId,
      {
        $push: {
          shares: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.shares.reels.push(reelId);
    await user.save();

    return res.status(200).json({
      msg: `shared reel ${reel.title} successfully`,
      shares: user.shares.reels,
    });
  }
);
