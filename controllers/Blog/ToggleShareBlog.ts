import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;

    const userId = (await getUserId(req)).toString();
    const user = await User.findById(userId);

    let blog = await Blog.findById(blogId);

    if (!blog)
      return next(new ErrorHandler(404, `cannot find blog with id ${blogId}`));

    const findUser = blog.shares.findIndex(
      (user) => user.toString() === userId
    );

    if (findUser >= 0) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: {
            shares: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.shares.blogs.splice(user.shares.blogs.indexOf(blogId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unshared successfully for blog ${blog.title}`,
        shares: user.shares.blogs,
      });
    }

    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          shares: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.shares.blogs.push(blogId);
    await user.save();

    return res.status(200).json({
      msg: `shared blog ${blog.title} successfully`,
      shares: user.shares.blogs,
    });
  }
);
