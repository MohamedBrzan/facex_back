import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Job from '../../models/Job/Job';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (job) return res.json(job);
    return next(new ErrorHandler(404, `Couldn't Find ${id}`));
  }
);
