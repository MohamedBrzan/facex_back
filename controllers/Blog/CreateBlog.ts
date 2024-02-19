import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let blog = await Blog.create({
      user: userId,
      ...req.body,
    });

    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          'blogs.published': blog._id,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    return res.status(200).json(blog);
  }
);
