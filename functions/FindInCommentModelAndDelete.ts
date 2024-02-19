import Comment from '../models/Comment/Comment';
import Reply from '../models/Comment/Reply';
import User from '../models/User/User';

export default async (parentModel: any, userId: string) => {
  for (const commentId of parentModel?.comments) {
    const comment = await Comment.findById(commentId);

    if (comment.user.toString() === userId) {
      Object.keys(comment.expressions).forEach((key) => {
        comment.expressions[key].forEach(async (id: any) => {
          await User.findByIdAndUpdate(id, {
            $pull: {
              'comments.reacted': commentId,
            },
          });
        });
      });
      for (const replyId of comment.replies) {
        const reply = await Reply.findById(replyId);
        Object.keys(reply.expressions).forEach((key) => {
          reply.expressions[key].forEach(async (id: any) => {
            await User.findByIdAndUpdate(id, {
              $pull: { 'replies.reacted': replyId },
            });
          });
        });

        await Reply.findByIdAndRemove(replyId);
      }
      await Comment.findByIdAndRemove(commentId);
    } else {
      console.log('from else')
      Object.keys(comment.expressions).forEach((key) => {
        comment.expressions[key].forEach(async (id: string, index: any) => {
          if (userId === id.toString()) {
            comment.expressions[key].splice(index, 1);
            await comment.save();
          }
        });
      });

      for (const replyId of comment.replies) {
        const reply = await Reply.findById(replyId);
        if (reply.user.toString() === userId) {
          Object.keys(reply.expressions).forEach((key) => {
            reply.expressions[key].forEach(async (id: any) => {
              await User.findByIdAndUpdate(id, {
                $pull: { 'replies.reacted': replyId },
              });
            });
          });
          await Reply.findByIdAndRemove(replyId);
        } else {
          Object.keys(reply.expressions).forEach((key) => {
            reply.expressions[key].forEach(async (id: string, index: any) => {
              if (userId === id.toString()) {
                reply.expressions[key].splice(index, 1);
                await reply.save();
              }
            });
          });
        }
      }
    }
  }
};
