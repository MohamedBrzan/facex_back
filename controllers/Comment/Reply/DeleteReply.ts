import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import ErrorHandler from '../../../middleware/ErrorHandler';
import User from '../../../models/User/User';
import { getUserId } from '../../../constants/UserId';
import Reel from '../../../models/Reel/Reel';
import Blog from '../../../models/Blog/Blog';
import Comment from '../../../models/Comment/Comment';
import Post from '../../../models/Post/Post';
import ExpressionLoop from '../../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.body;

    const userId = (await getUserId(req)).toString();

    const user = await User.findById(userId).select('replies');

    const reply = await Reply.findById(replyId);

    if (!reply)
      return next(
        new ErrorHandler(404, `This reply with id ${replyId} not found`)
      );

    if (userId !== reply.user.toString())
      return next(
        new ErrorHandler(
          404,
          "Sorry!!, It seems that you're not the owner of this reply"
        )
      );

    const comment = await Comment.findById(reply.ref.toString());

    if (!comment)
      return next(
        new ErrorHandler(
          404,
          `This comment with id ${comment._id.toString()} not found`
        )
      );

    const { ref } = comment;

    let refName: string;

    //* Remove reply From Post
    if (ref.post) {
      await Post.findByIdAndUpdate(
        ref.post,
        {
          $pull: {
            replies: replyId,
          },
        },
        { runValidators: true, new: true }
      );

      refName = 'post';

      //* Remove reply From Blog
    } else if (ref.blog) {
      await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $pull: {
            replies: replyId,
          },
        },
        { runValidators: true, new: true }
      );

      refName = 'blog';

      //* Remove reply From Reel
    } else if (ref.reel) {
      await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $pull: {
            replies: replyId,
          },
        },
        { runValidators: true, new: true }
      );

      refName = 'reel';
    }

    const users = ExpressionLoop(reply);

    for (const targetUser of users) {
      const user = await User.findById(targetUser).select('replies');
      //! Delete the comment from user.comments.reacted
      user.replies.reacted.splice(user.replies.reacted.indexOf(replyId), 1);
      await user.save();
    }

    //! Delete the reply's writer
    user.replies.published.splice(user.replies.published.indexOf(replyId), 1);
    await user.save();

    //! Delete reply from the comment
    await Comment.findByIdAndUpdate(
      reply.ref.toString(),
      { $pull: { replies: replyId } },
      { runValidators: true, new: true, upsert: true }
    );

    //! Delete reply from DB
    await Reply.findByIdAndRemove(reply);

    return res
      .status(200)
      .json({ message: `Reply Deleted Successfully from ${refName}` });
  }
);
