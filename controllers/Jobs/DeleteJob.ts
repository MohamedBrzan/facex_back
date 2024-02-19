import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Job from '../../models/Job/Job';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.body;
    const userId = (await getUserId(req)).toString();

    const job = await Job.findById(jobId);

    if (!job)
      return next(new ErrorHandler(404, `cannot find job with id ${jobId}`));

    if (job.user.toString() === userId)
      return next(
        new ErrorHandler(
          404,
          `Sorry!!, You're Not The Owner Of This Job ${jobId}`
        )
      );

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { 'jobs.published': jobId },
      },
      { new: true, runValidators: true, upsert: true }
    );

    await Job.findByIdAndRemove(jobId);

    return res.status(200).json({
      success: true,
      message: 'Job Deleted successfully',
    });
  }
);
