import { NextFunction, Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import { getUserId } from '../../constants/UserId';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { share } = req.body;

    const userId = (await getUserId(req)).toString();
    let user = await User.findById(userId);

    if (share.post) {
      const post = await Post.findById(share.post);
      if (!post) return next(new ErrorHandler(500, 'Post Not Found'));
      if (post.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your post so you can't share it`)
        );

      const findUser = post.shares.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already shared this post`));

      post.shares.push(user);
      await post.save();
      user.shares.posts.push(post);
      await user.save();
      return res.status(200).json({
        message: `You Share Post with Id ${post?._id} Successfully`,
      });
    } else if (share.blog) {
      const blog = await Blog.findById(share.blog);
      if (!blog) return next(new ErrorHandler(500, 'Blog Not Found'));
      if (blog.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your blog so you can't share it`)
        );

      const findUser = blog.shares.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already shared this blog`));
      blog.shares.push(user);
      await blog.save();
      user.shares.blogs.push(blog);
      await user.save();
      return res.status(200).json({
        message: `You Share Blog ${blog?.title} Successfully`,
      });
    } else if (share.reel) {
      const reel = await Reel.findById(share.reel);
      if (!reel) return next(new ErrorHandler(500, 'Reel Not Found'));
      if (reel.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your reel so you can't share it`)
        );

      const findUser = reel.shares.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already shared this reel`));

      reel.shares.push(user);
      await reel.save();
      user.shares.reels.push(reel);
      await user.save();
      return res.status(200).json({
        message: `You Share Reel ${reel?.title} Successfully`,
      });
    }
    return res.status(200).json({
      message: `there's something wrong, please try again later`,
    });
  }
);
