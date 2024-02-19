import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;

    let blog = await Blog.findById(blogId);

    if (!blog)
      return next(new ErrorHandler(404, `cannot find blog with id ${blogId}`));

    blog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return res.status(200).json(blog);
  }
);
