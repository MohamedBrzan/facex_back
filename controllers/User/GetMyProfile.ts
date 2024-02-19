import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();
    if (!req.isAuthenticated()) {
      return next(new ErrorHandler(404, 'You must be logged in'));
    }
    res.status(200).json(await User.findById(userId));
  }
);
