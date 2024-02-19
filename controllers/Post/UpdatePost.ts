import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;

    let post = await Post.findById(postId);

    if (!post)
      return next(new ErrorHandler(404, `cannot find post with id ${postId}`));

    post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return res.status(200).json(post);
  }
);
