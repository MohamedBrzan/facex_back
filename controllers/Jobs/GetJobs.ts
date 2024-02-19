import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json(await Job.find())
);
