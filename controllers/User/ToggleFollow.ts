import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();
    const { following } = req.body;

    let user = await User.findById(userId).select('followings name _id');

    if (following === userId)
      return next(new ErrorHandler(500, 'You Cannot Follow Yourself'));

    let follower = await User.findById(following).select('followers name');

    let userIndex: number = -1;

    if (follower?.followers.length > 0) {
      userIndex = follower?.followers?.findIndex(
        (f) => f.toString() === userId
      );
    }

    if (userIndex >= 0) {
      follower.followers.splice(userIndex, 1);
      await follower.save();

      user.followings.splice(user.followings.indexOf(following), 1);
      await user.save();

      return res.status(200).json({
        message: `You unFollowed ${follower?.name?.first} Successfully`,
      });
    }

    let followingIndex: number = -1;

    if (user?.followings.length > 0) {
      followingIndex = user?.followings?.findIndex(
        (f) => f.toString() === following
      );
    }

    if (followingIndex >= 0) {
      follower.followers.splice(userIndex, 1);
      await follower.save();

      user.followings.splice(user.followings.indexOf(following), 1);
      await user.save();

      return res.status(200).json({
        message: `You unFollowed ${follower?.name?.first} Successfully`,
      });
    }

    //* Following The User
    follower.followers.push(userId);
    await follower.save();

    //* Follow The User
    user.followings.push(following);
    await user.save();

    return res.status(200).json({
      message: `You Followed ${follower?.name?.first} Successfully`,
    });
  }
);
