import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';

export default AsyncHandler(async (req: Request, res: Response) => {
  const { sort } = req.query;

  if (sort === 'recommend') {
    return res.status(200).json(
      await Post.find()
        .populate([
          { path: 'user', select: 'name avatar profession' },
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
        ])
        .sort({ expressions: 'desc' })
    );
  } else if (sort === 'recently') {
    return res.status(200).json(
      await Post.find()
        .populate([
          { path: 'user', select: 'name avatar profession' },
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
        ])
        .sort({ comments: -1 })
    );
  } else if (sort === 'new') {
    return res.status(200).json(
      await Post.find()
        .populate([
          { path: 'user', select: 'name avatar profession' },
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
        ])
        .sort({ createdAt: 'desc' })
    );
  } else if (sort === 'old') {
    return res.status(200).json(
      await Post.find()
        .populate([
          { path: 'user', select: 'name avatar profession' },
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
        ])
        .sort({ createdAt: 'asc' })
    );
  }
  return res.status(200).json(
    await Post.find()
      .populate([
        { path: 'user', select: 'name avatar profession' },
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
      ])
      .sort({ expressions: 'asc' })
  );
});
