import { Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

import { getUserId } from '../../constants/UserId';

export default AsyncHandler(async (req: Request, res: Response) => {
  const userId = (await getUserId(req)).toString();

  const timing = new Date();
  timing.setDate(timing.getDate() + 30);

  const short = timing.toDateString();
  const day = timing.getDay();
  const month = timing.getMonth();

  let user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        deletion: {
          executeIn: {
            date: {
              full: timing.toISOString(),
              short,
            },
            month,
            day,
          },
          isActive: true,
        },
      },
    },
    { runValidators: true, new: true, upsert: true }
  );

  const { deletion } = user;

  return res.status(200).json({
    success: true,
    msg: 'user will delete after 30 days',
    deletion,
  });
});
