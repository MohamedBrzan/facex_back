import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;

    const userId = (await getUserId(req)).toString();

    let blog = await Blog.findById(blogId);

    if (!blog)
      return next(new ErrorHandler(404, `cannot find blog with id ${blogId}`));

    const findUser = blog.views.findIndex((user) => user.toString() === userId);

    if (findUser >= 0)
      return next(new ErrorHandler(404, `you already pushed in blog views`));

    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          views: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    const { views } = blog;

    return res
      .status(200)
      .json({ msg: `added user with id ${userId} to blog views`, views });
  }
);
