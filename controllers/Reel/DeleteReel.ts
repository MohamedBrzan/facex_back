import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';
import { getUserId } from '../../constants/UserId';
import Reply from '../../models/Comment/Reply';
import ExpressionLoop from '../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reelId } = req.body;
    let reel = await Reel.findById(reelId);
    if (!reel)
      return next(
        new ErrorHandler(404, `Couldn't Find reel With Id => ${reelId}`)
      );

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    if (reel.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, It seems that you're not the owner of this reel",
      });

    //! Delete the reel from the owner
    user.reels.published.splice(user.reels.published.indexOf(reelId), 1);
    await user.save();

    //* Get All User Who Reacted
    const usersWhoReacted = ExpressionLoop(reel);

    //* Get All Users Who Comments
    // TODO: Comments Loop
    for (let i = 0; i < reel.comments.length; i++) {
      const comment = await Comment.findById(reel.comments[i].toString());
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
    for (let i = 0; i < reel.shares.length; i++) {
      const user = await User.findById(reel.shares.toString()).select('shares');
      user.shares.reels.splice(user.shares.reels.indexOf(reelId), 1);
      await user.save();
    }

    //! Delete Expression from usersWhoReacted
    for (let userId of usersWhoReacted) {
      const user = await User.findById(userId).select('reels');
      user.reels.reacted.splice(user.reels.reacted.indexOf(reelId), 1);
      await user.save();
    }

    //* Delete the reel
    await Reel.findByIdAndRemove(reelId);

    return res
      .status(200)
      .json({ success: true, msg: 'reel Deleted Successfully' });
  }
);
