import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();
    const { follower } = req.body;

    let user = await User.findById(userId).select(
      'followers name _id'
    );

    if (follower === user._id.toString())
      return next(new ErrorHandler(500, 'You Cannot Follow Yourself'));

    let following = await User.findById(follower).select('followings name');

    const userIndex = following?.followings?.findIndex(
      (f) => f.toString() === userId
    );

    if (userIndex)
      return next(
        new ErrorHandler(500, `${user?.name} Is Already In Your Followings`)
      );

    let followingIndex = user?.followers?.findIndex(
      (f) => f.toString() === follower
    );

    if (followingIndex)
      return next(
        new ErrorHandler(500, `${following?.name} Is Already In Your Followers`)
      );

    //* Following The User
    following?.followings?.push(userId);
    await following.save();

    //* Follow The User
    user?.followers?.push(follower);
    await user.save();

    return res.status(200).json({
      message: `${following?.name} Follow ${user?.name} Successfully`,
    });
  }
);
