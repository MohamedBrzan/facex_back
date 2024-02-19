import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import jwt from 'jsonwebtoken';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return next(new ErrorHandler(500, 'This User Is Already Registered!'));

    user = await User.create(req.body);

    return res
      .status(200)
      .cookie(
        'token',
        jwt.sign(
          {
            avatar: user.avatar,
            cover: user.cover,
            name: user.name,
            followers: user.followers,
            followings: user.followings,
            _id: user._id,
          },
          process.env.SESSION_SECRET
        ),
        {
          maxAge: 1000 * 60 * 60 * 24 * 365.25,
          secure: false,
          httpOnly: true,
        }
      )
      .json(user);
  }
);
