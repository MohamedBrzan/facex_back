import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Post from '../../models/Post/Post';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate([
      { path: 'user', select: 'name avatar profession followers followings' },
      {
        path: 'comments',
        populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
      },

      {
        path: 'expressions',
        populate: [
          {
            path: 'angry',
            select: 'name avatar',
          },
          {
            path: 'disgust',
            select: 'name avatar',
          },
          {
            path: 'fear',
            select: 'name avatar',
          },
          {
            path: 'happy',
            select: 'name avatar',
          },
          {
            path: 'like',
            select: 'name avatar',
          },
          {
            path: 'love',
            select: 'name avatar',
          },
          {
            path: 'sad',
            select: 'name avatar',
          },
          {
            path: 'support',
            select: 'name avatar',
          },
          {
            path: 'surprise',
            select: 'name avatar',
          },
        ],
      },
    ]);
    if (!post)
      return next(new ErrorHandler(404, `Couldn't Find Post with Id ${id}`));

    return res.json(post);
  }
);
