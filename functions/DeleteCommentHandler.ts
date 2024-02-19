import Comment from '../models/Comment/Comment';
import Reply from '../models/Comment/Reply';
import User from '../models/User/User';

export default async (parentModel: any, commentId: string) => {
  const comment = await Comment.findById(commentId);

  for (const replyId of comment.replies) {
    const reply = await Reply.findById(replyId);
    Object.keys(reply.expressions).forEach((key) => {
      reply.expressions[key].forEach(async (id) => {
        await User.findByIdAndUpdate(
          id,
          { $pull: { 'replies.reacted': replyId } },
          { runValidators: true, new: true, upsert: true }
        );
      });
    });
    await User.findByIdAndUpdate(
      reply.user.toString(),
      { $pull: { 'replies.published': replyId } },
      { runValidators: true, new: true, upsert: true }
    );

    await Reply.findByIdAndRemove(replyId);
  }

  parentModel?.comments.splice(parentModel?.comments.indexOf(commentId), 1);
  await parentModel.save();

  await User.findByIdAndUpdate(comment.user.toString(), {
    $pull: { 'comments.published': commentId },
  });

  await Comment.findByIdAndRemove(commentId);
};
