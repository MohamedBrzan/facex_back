import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import User from '../../../models/User/User';
import { getUserId } from '../../../constants/UserId';
import ErrorHandler from '../../../middleware/ErrorHandler';
import ToggleExpression from '../../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId, expressionKey } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let reply = await Reply.findById(replyId);

    if (!reply) return next(new ErrorHandler(404, 'this reply not exists'));

    await ToggleExpression(
      res,
      userId,
      user,
      reply,
      replyId,
      'replies',
      expressionKey
    );
  }
);
