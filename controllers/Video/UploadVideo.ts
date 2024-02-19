import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { video, ref } = req.body;

    const userId = (await getUserId(req)).toString();

    let newVideo = await Video.create({ user: userId, video, ref });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          'videos.published': newVideo,
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

    return res.status(200).json(newVideo);
  }
);
