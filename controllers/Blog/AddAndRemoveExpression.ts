import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ToggleExpression from '../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expressionKey, blogId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let blog = await Blog.findById(blogId);

    if (!blog) return next(new ErrorHandler(404, 'this blog not exists'));

    await ToggleExpression(
      res,
      userId,
      user,
      blog,
      blogId,
      'blogs',
      expressionKey
    );
  }
);
