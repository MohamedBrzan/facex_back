import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Blog from '../../models/Blog/Blog';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (blog) return res.json(blog);
    return next(new ErrorHandler(404, `Couldn't Find ${id}`));
  }
);
