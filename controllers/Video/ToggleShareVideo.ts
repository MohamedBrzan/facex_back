import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.body;

    const userId = (await getUserId(req)).toString();
    const user = await User.findById(userId);

    let video = await Video.findById(videoId);

    if (!video)
      return next(
        new ErrorHandler(404, `cannot find video with id ${videoId}`)
      );

    const findUser = video.shares.findIndex(
      (user) => user.toString() === userId
    );

    if (findUser >= 0) {
      video = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            shares: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.shares.videos.splice(user.shares.videos.indexOf(videoId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unshared successfully for video`,
        shares: user.shares.videos,
      });
    }

    video = await Video.findByIdAndUpdate(
      videoId,
      {
        $push: {
          shares: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.shares.videos.push(videoId);
    await user.save();

    return res.status(200).json({
      msg: `shared video successfully`,
      shares: user.shares.videos,
    });
  }
);
