import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId, userId } = req.body;

    let blog = await Blog.findById(blogId);

    if (!blog)
      return next(new ErrorHandler(404, `cannot find blog with id ${blogId}`));

    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          views: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    const { views } = blog;

    return res.status(200).json({
      msg: `deleted user with id ${userId} from blog views successfully`,
      views,
    });
  }
);
