import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Hashtag from '../../models/Hashtag/Hashtag';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;

    const userId = (await getUserId(req)).toString();

    let hashtag = await Hashtag.findById(hashtagId);

    if (!hashtag)
      return next(
        new ErrorHandler(404, `Hashtag With Id ${hashtagId} Not Exist`)
      );

    if (hashtag.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This Hashtag",
      });

    let user = await User.findById(userId);

    const hashtagIndex = user.hashtags.published.findIndex(
      (hashtag) => hashtag.toString() === hashtagId
    );

    if (hashtagIndex >= 0) {
      user.hashtags.published.splice(hashtagIndex, 1);
      await user.save();
      await Hashtag.findByIdAndRemove(hashtagId);
    }
    return res
      .status(200)
      .json({ success: true, msg: 'Hashtag Deleted Successfully' });
  }
);
