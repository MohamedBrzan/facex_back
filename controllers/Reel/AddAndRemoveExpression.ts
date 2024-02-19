import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ToggleExpression from '../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expressionKey, reelId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let reel = await Reel.findById(reelId);

    if (!reel) return next(new ErrorHandler(404, 'this reel not exists'));

    await ToggleExpression(
      res,
      userId,
      user,
      reel,
      reelId,
      'reels',
      expressionKey
    );
  }
);
