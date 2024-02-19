import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    if (!user) return next(new ErrorHandler(404, 'You must be logged in'));

    const { blockId } = req.body;

    if (blockId === userId)
      return next(new ErrorHandler(404, 'You cannot block yourself'));

    const findBlocker = await User.findById(blockId);

    if (!findBlocker)
      return next(new ErrorHandler(404, 'BlockId not exists in DB'));

    const findBlockerInUserBlocks = user.blocks.find(
      (blocker) => blocker.toString() === blockId
    );

    if (findBlockerInUserBlocks)
      return next(new ErrorHandler(404, 'You already blocked this user'));

    user.blocks.push(blockId);
    await user.save();

    return res.status(200).json({
      success: true,
      msg: 'User Blocked Successfully',
      blocks: user.blocks,
    });
  }
);
