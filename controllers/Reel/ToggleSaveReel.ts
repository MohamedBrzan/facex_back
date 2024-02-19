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

    const findUser = reel.saves.findIndex((user) => user.toString() === userId);

    if (findUser >= 0) {
      reel = await Reel.findByIdAndUpdate(
        reelId,
        {
          $pull: {
            saves: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.saves.reels.splice(user.saves.reels.indexOf(reelId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unSaved successfully for reel ${reel.title}`,
        saves: user.saves.reels,
      });
    }

    reel = await Reel.findByIdAndUpdate(
      reelId,
      {
        $push: {
          saves: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.saves.reels.push(reelId);
    await user.save();

    return res.status(200).json({
      msg: `saved reel ${reel.title} successfully`,
      saves: user.saves.reels,
    });
  }
);
