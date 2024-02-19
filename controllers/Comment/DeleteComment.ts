import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';
import DeleteCommentModel from '../../functions/DeleteCommentModel';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import DeleteCommentHandler from '../../functions/DeleteCommentHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref, commentId } = req.body;

    const userId = (await getUserId(req)).toString();

    let comment = await Comment.findById(commentId);

    if (!comment)
      return next(new ErrorHandler(404, `This Comment Id Not Found`));

    if (userId !== comment.user.toString())
      return next(
        new ErrorHandler(
          404,
          "Sorry!!, It seems that you're not the owner of this comment"
        )
      );

    let refName: string;
    let refComments: any[];
    let refModel: any;

    //* Remove Comment From Post
    if (ref.post) {
      refModel = await Post.findById(ref.post);
      const { comments } = refModel;
      refComments = comments;
      refName = 'post';
      //* Remove Comment From Blog
    } else if (ref.blog) {
      refModel = await Blog.findById(ref.blog);
      const { comments } = refModel;
      refComments = comments;
      refName = 'blog';
      //* Remove Comment From Reel
    } else if (ref.reel) {
      refModel = await Reel.findById(ref.reel);
      const { comments } = refModel;
      refComments = comments;
      refName = 'reel';
    }

    //! Delete Comment From user.comments.reacted & Delete the comment's writer
    await DeleteCommentHandler(refModel, commentId);

    return res.status(200).json({
      message: `deleted comment ${commentId} successfully from ${refName}`,
      [`${refName} comments`]: refComments,
    });
  }
);
