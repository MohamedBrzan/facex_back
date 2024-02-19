import { Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

import { getUserId } from '../../constants/UserId';

export default AsyncHandler(async (req: Request, res: Response) => {
  const userId = (await getUserId(req)).toString();

  let user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        deletion: {
          executeIn: {
            date: {
              full: null,
              short: null,
            },
            month: null,
            day: null,
          },
          isActive: false,
        },
      },
    },
    { runValidators: true, new: true, upsert: true }
  );

  const { deletion } = user;

  return res.status(200).json({
    success: true,
    msg: 'User deletion is inactivated successfully',
    deletion,
  });
});
