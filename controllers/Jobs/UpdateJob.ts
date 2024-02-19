import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.body;
    let job = await Job.findById(jobId);

    if (!job)
      return next(new ErrorHandler(404, `Job With Id ${jobId} Not Exist`));

    job = await Job.findByIdAndUpdate(jobId, req.body, {
      runValidators: true,
      new: true,
      upsert: true,
    });
    return res.status(200).json(job);
  }
);
