import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Hashtag from '../../models/Hashtag/Hashtag';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;

    const userId = (await getUserId(req)).toString();

    let hashtag = await Hashtag.findById(hashtagId).select('followers');

    if (!hashtag)
      return next(
        new ErrorHandler(404, `Cannot Find Hashtag With Id : ${hashtagId}`)
      );

    let user = await User.findById(userId).select('hashtags');

    const findHashtagOwner = user.hashtags.published.findIndex(
      (tag) => tag === hashtag
    );

    if (findHashtagOwner > -1)
      return next(new ErrorHandler(500, `You Cannot Follow Your Hashtag`));

    const findUser = hashtag?.followers?.findIndex(
      (user) => user.toString() === userId
    );

    if (findUser > -1)
      return next(new ErrorHandler(500, `You Already Following This Hashtag`));

    hashtag.followers.push(userId);
    await hashtag.save();

    user.hashtags.reacted.push(hashtagId);
    await user.save();

    return res.status(200).json({ message: 'You Follow Hashtag Successfully' });
  }
);
