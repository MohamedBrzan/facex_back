import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ToggleExpression from '../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expressionKey, postId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let post = await Post.findById(postId);

    if (!post) return next(new ErrorHandler(404, 'this post not exists'));

    await ToggleExpression(
      res,
      userId,
      user,
      post,
      postId,
      'posts',
      expressionKey
    );
  }
);
