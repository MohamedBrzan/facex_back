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

    const findUser = video.saves.findIndex(
      (user) => user.toString() === userId
    );

    if (findUser >= 0) {
      video = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            saves: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.saves.videos.splice(user.saves.videos.indexOf(videoId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unsaved successfully for video`,
        saves: user.saves.videos,
      });
    }

    video = await Video.findByIdAndUpdate(
      videoId,
      {
        $push: {
          saves: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.saves.videos.push(videoId);
    await user.save();

    return res.status(200).json({
      msg: `saved video successfully`,
      saves: user.saves.videos,
    });
  }
);
