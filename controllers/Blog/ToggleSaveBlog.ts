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

    const findUser = blog.saves.findIndex((user) => user.toString() === userId);

    if (findUser >= 0) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: {
            saves: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.saves.blogs.splice(user.saves.blogs.indexOf(blogId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unsaved successfully for blog ${blog.title}`,
        saves: user.saves.blogs,
      });
    }

    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          saves: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.saves.blogs.push(blogId);
    await user.save();

    return res.status(200).json({
      msg: `saved blog ${blog.title} successfully`,
      saves: user.saves.blogs,
    });
  }
);
