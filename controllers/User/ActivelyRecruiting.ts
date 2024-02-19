import { Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

import { getUserId } from '../../constants/UserId';

export default AsyncHandler(async (req: Request, res: Response) => {
  const userId = (await getUserId(req)).toString();

  let user = await User.findById(userId);

  const jobsLength = user.jobs.published.length;
  let jobsRecruited: number = 0;
  user.jobs.published.forEach((job) => {
    if (job.employees.length > 0) {
      jobsRecruited += 1;
    }
  });

  const recruitingAverage = (jobsRecruited / jobsLength) * 100;

  if (recruitingAverage > 50) {
    user.actively_recruiting = true;
    await user.save();

    const { actively_recruiting } = user;

    return res.status(200).json({
      success: true,
      msg: 'user is actively recruiting',
      actively_recruiting,
    });
  }

  user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        actively_recruiting: false,
      },
    },
    { runValidators: true, new: true, upsert: true }
  );

  return res.status(404).json({ msg: "user isn't actively recruiting" });
});
