import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';
import Post from '../../models/Post/Post';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId).select('posts');

    let post = await Post.findById(postId);

    if (!post)
      return next(new ErrorHandler(404, `cannot find post with id ${postId}`));

    const findPost = user.posts.reacted.findIndex(
      (p) => p.toString() === postId
    );

    if (findPost >= 0)
      return next(
        new ErrorHandler(
          404,
          `you already with reacted to this post ${postId} before`
        )
      );

    user.posts.reacted.push(postId);
    await user.save();

    const { reacted } = user.posts;

    return res.status(200).json({
      message: `added post with id ${postId} to user posts.reacted Successfully`,
      reacted,
    });
  }
);
