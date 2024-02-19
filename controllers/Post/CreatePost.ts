import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let post = await Post.create({
      user: userId,
      ...req.body,
    });

    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          'posts.published': post._id,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    return res.status(200).json(post);
  }
);
