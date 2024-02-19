import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import { nextTick } from 'process';
import ErrorHandler from '../../middleware/ErrorHandler';
// import PostInterface from '../../Interfaces/Post/Post';
// import BlogInterface from '../../Interfaces/Blog/Blog';
// import ReelInterface from '../../Interfaces/Reel/Reel';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, visiblePrivacy, ref } = req.body;
    let refName: string;
    let parentModel;
    const userId = (await getUserId(req)).toString();

    //* If The Comment For Post | Blog | Reel

    if (ref.post) {
      parentModel = await Post.findById(ref.post);
      if (!parentModel)
        return next(
          new ErrorHandler(404, `Could not find post with id ${ref.post}`)
        );
      refName = 'post';
    } else if (ref.blog) {
      parentModel = await Blog.findById(ref.blog);
      if (!parentModel)
        return next(
          new ErrorHandler(404, `Could not find blog with id ${ref.blog}`)
        );
      refName = 'blog';
    } else if (ref.reel) {
      parentModel = await Reel.findById(ref.reel);
      if (!parentModel)
        return next(
          new ErrorHandler(404, `Could not find reel with id ${ref.reel}`)
        );
      refName = 'reel';
    }

    let comment = await Comment.create({
      user: userId,
      message,
      visiblePrivacy,
      ref,
    });

    parentModel.comments.push(comment._id);
    await parentModel.save();

    //* Add Comment To The User Comments

    await User.findByIdAndUpdate(
      userId,
      { $push: { 'comments.published': comment._id } },
      { runValidators: true, new: true, upsert: true }
    );

    return res
      .status(404)
      .json({ msg: `Added comment successfully to ${refName}`, comment });
  }
);
