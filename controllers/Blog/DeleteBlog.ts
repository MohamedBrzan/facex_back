import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Blog from '../../models/Blog/Blog';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';
import { getUserId } from '../../constants/UserId';
import Reply from '../../models/Comment/Reply';
import ExpressionLoop from '../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;
    let blog = await Blog.findById(blogId);
    if (!blog)
      return next(
        new ErrorHandler(404, `Couldn't Find blog With Id => ${blogId}`)
      );

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    if (blog.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, It seems that you're not the owner of this blog",
      });

    //! Delete the blog from the owner
    user.blogs.published.splice(user.blogs.published.indexOf(blogId), 1);
    await user.save();

    //* Get All User Who Reacted
    const usersWhoReacted = ExpressionLoop(blog);

    //* Get All Users Who Comments
    // TODO: Comments Loop
    for (let i = 0; i < blog.comments.length; i++) {
      const comment = await Comment.findById(blog.comments[i].toString());
      const user = await User.findById(comment.user.toString());
      const founded = user.comments.reacted.splice(
        user.comments.reacted.indexOf(comment),
        1
      );

      founded.length < 1 &&
        user.comments.published.splice(
          user.comments.published.indexOf(comment),
          1
        );
      await user.save();

      const commentExpressions = ExpressionLoop(comment);

      for (let expression of commentExpressions) {
        const user = await User.findById(expression.toString());
        user.comments.reacted.splice(user.comments.reacted.indexOf(comment), 1);
        await user.save();
      }

      // TODO: Comment Replies Loop
      for (let j = 0; j < comment.replies.length; j++) {
        const reply = await Reply.findById(comment.replies[j].toString());
        const user = await User.findById(reply.user.toString());
        const founded = user.replies.reacted.splice(
          user.replies.reacted.indexOf(reply),
          1
        );

        founded.length < 1 &&
          user.replies.published.splice(
            user.replies.published.indexOf(reply),
            1
          );
        await user.save();

        const repliesExpressions = ExpressionLoop(reply);
        for (let expression of repliesExpressions) {
          const user = await User.findById(expression.toString());
          user.replies.reacted.splice(user.replies.reacted.indexOf(reply), 1);
          await user.save();
        }

        await Reply.findByIdAndRemove(reply);
      }
      await Comment.findByIdAndRemove(comment);
    }

    //* Get All Users Who Shared
    // TODO: Share Loop
    for (let i = 0; i < blog.shares.length; i++) {
      const user = await User.findById(blog.shares.toString()).select('shares');
      user.shares.blogs.splice(user.shares.blogs.indexOf(blogId), 1);
      await user.save();
    }

    //! Delete Expression from usersWhoReacted
    for (let userId of usersWhoReacted) {
      const user = await User.findById(userId).select('blogs');
      user.blogs.reacted.splice(user.blogs.reacted.indexOf(blogId), 1);
      await user.save();
    }

    //* Delete the blog
    await Blog.findByIdAndRemove(blogId);

    return res
      .status(200)
      .json({ success: true, msg: 'blog Deleted Successfully' });
  }
);
