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
        'verified.isActive': true,
      },
    },
    { runValidators: true, new: true, upsert: true }
  );

  const { verified } = user;

  return res.status(200).json({
    success: true,
    msg: 'verification request accepted :)',
    verified,
  });
});
