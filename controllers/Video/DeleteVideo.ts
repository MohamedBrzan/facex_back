import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.body;

    const userId = (await getUserId(req)).toString();

    let video = await Video.findById(videoId);

    if (!video)
      return next(new ErrorHandler(404, `Video With Id ${videoId} Not Exist`));

    if (video.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This Video",
      });

    let user = await User.findById(userId);

    const videoIndex = user.videos.published.findIndex(
      (video) => video.toString() === videoId
    );

    if (videoIndex >= 0) {
      user.videos.published.splice(videoIndex, 1);
      await user.save();
      await Video.findByIdAndRemove(videoId);

      return res
        .status(200)
        .json({ success: true, msg: 'Video Deleted Successfully' });
    }
  }
);
