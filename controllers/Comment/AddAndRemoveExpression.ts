import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ToggleExpression from '../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expressionKey, commentId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let comment = await Comment.findById(commentId);

    if (!comment) return next(new ErrorHandler(404, 'this comment not exists'));

    await ToggleExpression(
      res,
      userId,
      user,
      comment,
      commentId,
      'comments',
      expressionKey
    );

 
  }
);
