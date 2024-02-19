import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;

    const userId = (await getUserId(req)).toString();
    const user = await User.findById(userId);

    let post = await Post.findById(postId);

    if (!post)
      return next(new ErrorHandler(404, `cannot find post with id ${postId}`));

    const findUser = post.saves.findIndex((user) => user.toString() === userId);

    if (findUser >= 0) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            saves: userId,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      user.saves.posts.splice(user.saves.posts.indexOf(postId), 1);
      await user.save();

      return res.status(200).json({
        msg: `unSaved successfully for post Id ${post._id}`,
      });
    }

    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          saves: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    user.saves.posts.push(postId);
    await user.save();

    return res.status(200).json({
      msg: `saved post Id ${post._id} successfully`,
    });
  }
);
