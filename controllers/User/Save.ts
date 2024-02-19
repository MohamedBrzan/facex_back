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
    const { save } = req.body;

    const userId = (await getUserId(req)).toString();
    let user = await User.findById(userId);

    if (save.post) {
      const post = await Post.findById(save.post);
      if (!post) return next(new ErrorHandler(500, 'Post Not Found'));
      if (post.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your post so you can't save it`)
        );

      const findUser = post.saves.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already saved this post`));

      post.saves.push(user);
      await post.save();
      user.saves.posts.push(post);
      await user.save();
      return res.status(200).json({
        message: `You save Post Id ${post?._id} Successfully`,
      });
    } else if (save.blog) {
      const blog = await Blog.findById(save.blog);
      if (!blog) return next(new ErrorHandler(500, 'Blog Not Found'));
      if (blog.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your blog so you can't save it`)
        );

      const findUser = blog.saves.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already saved this blog`));

      blog.saves.push(user);
      await blog.save();
      user.saves.blogs.push(blog);
      await user.save();
      return res.status(200).json({
        message: `You save Blog ${blog?.title} Successfully`,
      });
    } else if (save.reel) {
      const reel = await Reel.findById(save.reel);
      if (!reel) return next(new ErrorHandler(500, 'Reel Not Found'));
      if (reel.user.toString() === userId)
        return next(
          new ErrorHandler(500, `it's your reel so you can't save it`)
        );

      const findUser = reel.saves.findIndex((u) => u.toString() === userId);

      if (findUser >= 0)
        return next(new ErrorHandler(500, `you already saved this reel`));

      reel.saves.push(user);
      await reel.save();
      user.saves.reels.push(reel);
      await user.save();
      return res.status(200).json({
        message: `You save Reel ${reel?.title} Successfully`,
      });
    }
    return res.status(200).json({
      message: `there's something wrong, please try again later`,
    });
  }
);
